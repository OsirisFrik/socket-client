import { SocketOptions, ValueKey } from '@/../types/index'
import { io, Socket } from 'socket.io-client'
import { ElNotification } from 'element-plus'

function parseArray(val: ValueKey[]): { [key: string]: string } {
  const result: { [key: string]: string } = {}

  for (let i = 0; i < val.length; i++) {
    const option = val[i]

    if (option.active && option.value) result[option.key] = option.value
  }

  return result
}

class SocketClient {
  io: Socket

  constructor(server: string, options: SocketOptions) {
    this.io = io(server, {
      auth: options.auth ? options.headers?.find((item) => item.auth) : undefined,
      query: parseArray(options.querys || []),
      extraHeaders: parseArray(options.headers || []),
      path: options.path?.active ? options.path.value : '/socket.io',
      transports: ['websocket']
    })

    this.io.on('connect', () => ElNotification({
      type: 'success',
      title: 'Connected',
      message: 'Socket connected'
    }))
  }
}

export default SocketClient
