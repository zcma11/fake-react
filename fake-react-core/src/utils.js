export const NoFlags = 0b00000000000000000000
export const Placement = 0b00000000000000000010
export const Update = 0b00000000000000000100
export const Deletion = 0b00000000000000001000

const isVaild = type => val =>
  Object.prototype.toString.call(val).slice(8, -1) === type

export const isRegExp = isVaild('RegExp')
export const isFunction = isVaild('Function')
export const isObject = isVaild('Object')
export const isArray = isVaild('Array')
export const isString = isVaild('String')
export const isNumber = isVaild('Number')