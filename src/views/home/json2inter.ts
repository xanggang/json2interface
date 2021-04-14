import { isBaseType, normalTypes } from './utils'
import humps from 'humps'

export interface IOption {
  globalName?: string;
  indent?: string;
  memberAfterSemicolon?: boolean;
  interfaceAfterSemicolon?: boolean;
  isExportAll?: boolean;
  interfacePrefix?: string;
}

interface IWaitProcessObjs {
  key: string;
  value: any;
}

interface IJson {
  [key: string]: string | number | boolean | IJson | IArray;
}

type IArray = IJson[] | string[] | number[] | boolean[]

export default class JSON2Inter {
  globalName: string // 全局接口名称
  indent: string // 生成的代码缩进 一个tab
  memberAfterSemicolon: string // 接口成员之后是否需要分号
  interfaceAfterSemicolon: string // 接口之后是否需要分号
  isExportAll: boolean // 是否导出全部成员， 默认全部导出
  interfacePrefix: string // 接口前缀

  #interfaceNames: string[] = [] // 接口名称， 用来防止重复
  #waitProcessObjs: IWaitProcessObjs[] = [] // 待处理的对象

  constructor (option: IOption = {}) {
    this.globalName = option.globalName || 'IGlobalTypes'
    this.indent = option.indent || '  '
    this.memberAfterSemicolon = option.memberAfterSemicolon ? ';' : ''
    this.interfaceAfterSemicolon = option.interfaceAfterSemicolon ? ';' : ''
    this.isExportAll = Boolean(option.isExportAll)
    this.interfacePrefix = option.interfacePrefix || 'I'
  }

  /**
   * 首位字母大写
   * @param key
   */
  getBaseName (key: string): string {
    const firstName = key.substring(0, 1)
    const lastName = key.substring(1)
    return firstName.toUpperCase() + lastName
  }

  /**
   * 获取接口名称， 如果有重复的则加上序号
   * @param name 返回字段key
   * @returns {string} 返回处理过的名称
   */
  getOnlyInterfaceName (name: string): string {
    if (!this.#interfaceNames.includes(name)) {
      return name
    }
    // 取最后一位
    let lastCharacter: string | number = name.slice(-1)
    if (lastCharacter >= '0' && lastCharacter <= '9') {
      lastCharacter = parseInt(lastCharacter) + 1
      return this.getOnlyInterfaceName(name.substring(0, name.length - 1) + lastCharacter)
    } else {
      return this.getOnlyInterfaceName(name + '1')
    }
  }

  /**
   * 获取接口名称
   * @param key
   */
  getInterfaceName (key: string) {
    let fullName: string = this.interfacePrefix + this.getBaseName(key)
    fullName = this.getOnlyInterfaceName(fullName)
    this.#interfaceNames.push(fullName)
    return fullName
  }

  /**
   * 生成包裹
   * @param key
   * @param string
   */
  getWrap (key: string, string: string) {
    if (this.isExportAll) {
      return `export interface ${key} {\n${string}}`
    }
    return `interface ${key} {\n${string}}`
  }

  /**
   * 生成包裹
   * @param key
   * @param string
   */
  getExportWrap (key: string, string: string) {
    return `export default interface ${key} {\n${string}}`
  }

  /**
   * 处理数组
   * @param array 包含当前数组的json对象
   * @param key 数组对应的key
   * @returns {*}
   */
  handleArray (array: IArray, key: string) {
    let inters = ''
    if (array.length === 0) {
      inters += `${this.indent}${key}: any[]${this.memberAfterSemicolon}\n`
      return inters
    }

    // 如果是而为数组
    if (array[0] instanceof Array) {
      // 判断数组是否都为boolean number string等基本类型
      inters += `${this.indent}${key}:any[]${this.memberAfterSemicolon}\n`
    } else {
      // 有可能是对象也有可能是普通类型，如果是对象，类型按照第一个元素类型定义，如果都为普通类型，则指定为具体类型数组
      // 否则为any数组
      // 判断是否为 [1,2,3]形式处理
      if (normalTypes.includes(typeof array[0])) {
        const type = isBaseType(array)
        inters += `${this.indent}${key}: ${type + '[]'}${this.memberAfterSemicolon}\n`
      } else {
        const interfaceName = this.getInterfaceName(key)
        inters += `${this.indent}${key}: ${interfaceName + '[]'}${this.memberAfterSemicolon}\n`
        this.#waitProcessObjs.push({
          key: interfaceName,
          value: array[0]
        })
      }
    }
    return inters
  }

  /**
   * 处理json
   * @param json 待处理json
   * @param name 接口名字
   * @param first 是否为第一级
   * @returns {*}
   */
  parseJson (json: IJson, name: string, first?: boolean) {
    const keys: string[] = Reflect.ownKeys(json) as string[]
    let type
    let inters = ''
    for (const key of keys) {
      // 判断值类型
      type = typeof json[key]
      if (normalTypes.includes(type)) {
        inters += `${this.indent}${key}: ${type}${this.memberAfterSemicolon}\n`
      } else if (Array.isArray(json[key])) {
        inters += this.handleArray(json[key] as IArray, key)
      } else if (json[key] instanceof Object) {
        const interfaceName = this.getInterfaceName(key)
        inters += `${this.indent}${key}: ${interfaceName}${this.memberAfterSemicolon}\n`
        this.#waitProcessObjs.push({
          key: interfaceName,
          value: json[key]
        })
      }
    }
    if (first) {
      return this.getExportWrap(this.globalName, inters)
    }
    return this.getWrap(name, inters)
  }

  /**
   * 导出接口定义
   * @param res json字符串
   * @returns {*}
   */
  interfaceDefinition (res: object) {
    this.clear()
    const json = humps.camelizeKeys(res) as IJson
    let result = ''
    try {
      result = this.parseJson(json, this.getInterfaceName(this.globalName), true)
      for (const obj of this.#waitProcessObjs) {
        result += `${this.interfaceAfterSemicolon}\n \n`
        result += this.parseJson(obj.value, obj.key)
      }
      result += `${this.interfaceAfterSemicolon}\n \n`
    } catch (e) {
      result = e.message
    }
    return result
  }

  /**
   * 清除副作用
   */
  clear () {
    this.#interfaceNames = []
    this.#waitProcessObjs = []
  }
}
