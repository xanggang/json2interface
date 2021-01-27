// 接口名称
const interfaceName = ''
// 直接拼接基本类型
const normalTypes = ['string', 'number', 'boolean']
// 处理数组
let objs: any[] = []
const interfaceNames: string[] = []
// 生成的代码缩进 一个tab
const indent = '  '

export interface IJson {
  [key: string]: string | number | boolean | IJson | IArray;
}

export type IArray = IJson[] | string[] | number[] | boolean[]
/**
 * 获取接口名称
 * @param name 返回字段key
 * @returns {string} 返回处理过的名称
 */
function getOnlyInterfaceName (name: string): string {
  if (!interfaceNames.includes(name)) {
    return name
  }
  // 取最后一位
  let lastCharacter: string | number = name.slice(-1)
  if (lastCharacter >= '0' && lastCharacter <= '9') {
    lastCharacter = parseInt(lastCharacter) + 1
    return getOnlyInterfaceName(name.substring(0, name.length - 1) + lastCharacter)
  } else {
    return getOnlyInterfaceName(name + '1')
  }
}

/**
 * 首位字母大写
 * @param key
 */
function getBaseName (key: string): string {
  const firstName = key.substring(0, 1)
  const lastName = key.substring(1)
  return firstName.toUpperCase() + lastName
}

function getInterfaceName (key: string) {
  let fullName: string = 'I' + getBaseName(key)
  fullName = getOnlyInterfaceName(fullName)
  interfaceNames.push(fullName)
  return fullName
}

/**
 * 判断数组是否为普通类型数组
 * @param arr
 * @returns {string}
 */
function _isBaseType (arr: any[]) {
  const type = typeof arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (type !== typeof arr[i]) {
      return 'any'
    }
  }
  return type
}

function getWrap (key: string, string: string) {
  return `export interface ${key} {\n${string}}`
}

function getExportWrap (key: string, string: string) {
  return `export default interface ${key} {\n${string}}`
}

/**
 * 处理数组
 * @param array 包含当前数组的json对象
 * @param key 数组对应的key
 * @param inters 拼接字符串
 * @param indent 缩进
 * @returns {*}
 */
function handleArray (array: IArray, key: string, inters: string, indent: string) {
  if (array.length === 0) {
    inters += `${indent}${key}: any[];\n`
  } else {
    // 如果是个空数组或者数组里面为非对象
    if (array[0] instanceof Array) {
      // 判断数组是否都为boolean number string等基本类型
      inters += `${indent}${key}:any[];\n`
    } else {
      // 有可能是对象也有可能是普通类型，如果是对象，类型按照第一个元素类型定义，如果都为普通类型，则指定为具体类型数组
      // 否则为any数组
      // 判断是否为 [1,2,3]形式处理
      if (normalTypes.includes(typeof array[0])) {
        const type = _isBaseType(array)
        inters += `${indent}${key}: ${type + '[]'}\n`
      } else {
        const interfaceName = getInterfaceName(key)
        inters += `${indent}${key}: ${interfaceName + '[]'};\n`
        objs.push({
          key: interfaceName,
          value: array[0]
        })
      }
    }
  }
  return inters
}

/**
 * 处理json
 * @param json 待处理json
 * @param name 接口名字
 * @param inters 拼接的字符串
 * @param first 是否为第一级
 * @param ind 缩进方式 默认一个tab
 * @returns {*}
 */
function parseJson (json: IJson, name: string, inters: string, first = true, ind = indent) {
  const keys: string[] = Reflect.ownKeys(json) as string[]
  let type
  for (const key of keys) {
    // 判断值类型
    type = typeof json[key]
    if (normalTypes.includes(type)) {
      inters += `${ind}${key}: ${type};\n`
    } else if (Array.isArray(json[key])) {
      inters = handleArray(json[key] as IArray, key, inters, ind)
    } else if (json[key] instanceof Object) {
      const interfaceName = getInterfaceName(key)
      inters += `${indent}${key}: ${interfaceName};\n`
      objs.push({
        key: interfaceName,
        value: json[key]
      })
    }
  }
  if (first) {
    return getExportWrap('III', inters)
  }
  return getWrap(name, inters)
}
/**
 * 导出接口定义
 * @param res json字符串
 * @returns {*}
 */
export default function interfaceDefinition (res: string) {
  let result
  objs = []
  try {
    const json: IJson = JSON.parse(res)
    result = parseJson(json, getInterfaceName(interfaceName), '', true)
    for (const obj of objs) {
      result += ';\n \n'
      result += parseJson(obj.value, obj.key, '', false)
    }
  } catch (e) {
    result = e.message
  }
  return result
}
