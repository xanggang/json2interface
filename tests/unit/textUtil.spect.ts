import interfaceDefinition from '../../src/views/home/util'

const data = {
  number: 1,
  string: 'string',
  boolean: true,
  null: null,
  symbol: Symbol('symbol'),
  stringArray: ['a', 'b', 'c'],
  numberArray: [1, 2, 3],
  objectArray: [
    {
      c: 1,
      d: 1
    }
  ],
  object: {
    a: 1,
    b: 2
  },
  arrayObject: {
    a: [1, 2, 3]
  }
}

describe('text interfaceDefinition', () => {
  it('text interfaceDefinition', () => {
    console.log(interfaceDefinition(JSON.stringify(data)))
  })
})
