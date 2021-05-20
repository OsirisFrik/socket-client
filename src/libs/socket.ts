import { SocketOptions, ValueKey } from '@/../types/index'
import { io, Socket } from 'socket.io-client'
import { EventEmitter } from 'events'
import { notify } from './notify'

function parseArray(val: ValueKey[]): { [key: string]: string } {
  const result: { [key: string]: string } = {}

  for (let i = 0; i < val.length; i++) {
    const option = val[i]

    if (option.active && option.value) result[option.key] = option.value
  }

  return result
}

class SocketClient extends EventEmitter {
  io: Socket

  constructor(server: string, options: SocketOptions) {
    super()

    this.io = io(server, {
      auth: options.auth ? options.headers?.find((item) => item.auth) : undefined,
      query: parseArray(options.querys || []),
      extraHeaders: parseArray(options.headers || []),
      path: options.path?.active ? options.path.value : '/socket.io',
      transports: ['websocket'],
      autoConnect: false
    })

    this.io.on('connect', () => {
      notify({
        title: 'Connected',
        message: 'success connect',
        type: 'success'
      })

      this.emit('connected', true)
    })

    this.io.on('disconnect', () => this.emit('connected', false))
  }

  connect(): void {
    this.io.connect()
  }

  disconnect(): void {
    this.io.disconnect()
  }

  send(event: string, value: any): void {
    console.log(event, value)
    this.io.emit(event, value)
  }

  get connected(): boolean {
    return this.io.connected
  }
}

export default SocketClient
