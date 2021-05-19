export interface ValueKey {
  key: string
  value?: string
  active?: boolean
  auth?: boolean
}

export enum ValueTypes {
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'json',
  JS = 'js'
}

export type SocketEvent = Omit<ValueKey, 'key'>

export interface ValueType extends Omit<ValueKey, 'active'> {
  valueType: 'string' | 'number' | 'json' | 'js'
}

export type SocketEmit = ValueType

export interface SocketOptions {
  path?: Omit<ValueKey, 'key'>
  querys?: ValueKey[]
  headers?: ValueKey[]
  auth?: boolean
}

export interface SocketSettings {
  url: string
  options: SocketOptions,
  events: SocketEvent[],
  emits: ValueType[]
}
