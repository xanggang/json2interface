
/**
 * 对象中是否包含某个key
 * **/
export function hasKey (obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, 'key')
}

/**
 * 校验是否是json
 * @param str
 */
export function checkIsJson (str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 判断数组的类型
 * @param arr
 * @returns {string}
 */
export function isBaseType (arr: any[]) {
  const type = typeof arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (type !== typeof arr[i]) {
      return 'any'
    }
  }
  return type
}

// 直接拼接基本类型
export const normalTypes = ['string', 'number', 'boolean']

/**
 * 获取json
 * @param value
 */
export function getJson (value: string): object {
  let jsonString: object = {}
  try {
    jsonString = JSON.parse(value)
  } catch (parseErr) {
    try {
      // eslint-disable-next-line no-eval
      jsonString = eval('(' + value + ')')
    } catch (evalErr) {
      jsonString = evalErr.message
    }
  }
  return jsonString
}

/**
 * 校验json合法性， 从input获取的字符串不同与普通的json
 * @param value
 */
export function checkJson (value: string) {
  try {
    JSON.parse(value)
    return false
  } catch (parseErr) {
    try {
      // eslint-disable-next-line no-eval
      eval('(' + value + ')')
      return false
    } catch (evalErr) {
      return true
    }
  }
}

export function getConfig () {
  return {
    memberAfterSemicolon: localStorage.getItem('memberAfterSemicolon') === '1',
    interfaceAfterSemicolon: localStorage.getItem('interfaceAfterSemicolon') === '1',
    interfacePrefix: localStorage.getItem('interfacePrefix') || 'I',
    globalName: localStorage.getItem('globalName') || 'IGlobalTypes',
    isExportAll: localStorage.getItem('isExportAll') === '1'
  }
}

interface ILocalStorageConfig {
  memberAfterSemicolon: boolean;
  interfaceAfterSemicolon: boolean;
  interfacePrefix: string;
  globalName: string;
  isExportAll: boolean;
}
export function setConfig (config: ILocalStorageConfig) {
  localStorage.setItem('memberAfterSemicolon', config.memberAfterSemicolon ? '1' : '0')
  localStorage.setItem('interfaceAfterSemicolon', config.interfaceAfterSemicolon ? '1' : '0')
  localStorage.setItem('interfacePrefix', config.interfacePrefix)
  localStorage.setItem('globalName', config.globalName)
  localStorage.setItem('isExportAll', config.isExportAll ? '1' : '0')
}
