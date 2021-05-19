import { ElNotification } from 'element-plus'
import { INotificationOptions } from 'element-plus/lib/el-notification/src/notification.type'

export function notify(options: INotificationOptions) {
  ElNotification({
    ...options
  })
}
