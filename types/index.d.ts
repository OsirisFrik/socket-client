export interface ValueKey {
  key: string | null
  value: string | null
  active: boolean | null
}

export enum ValueTypes {
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'object',
  JS = 'js'
}

export type SocketEvent = Omit<ValueKey, 'key'>

export interface ValueType extends Omit<ValueKey, 'active'> {
  valueType: 'string' | 'number' | 'json' | 'js'
}

export type SocketEmit = ValueType

export interface SocketSettings {
  url: string | null
  options: {
    path?: Omit<ValueKey, 'key'>
    querys?: ValueKey[]
    headers?: ValueKey[]
  },
  events: SocketEvent[],
  emits: ValueType[]
}

namespace SocketSettings {
  type SocketEmit = ValueType
  type SocketEvent = ValueKey

  interface Socket {
    url: string | null
    options: {
      path?: Omit<ValueKey, 'key'>
      querys: ValueKey[]
    }
  }
}
