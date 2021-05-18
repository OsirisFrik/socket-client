import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/lib/theme-chalk/index.css'
import 'remixicon/fonts/remixicon.css'
import './assets/custom.scss'

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
