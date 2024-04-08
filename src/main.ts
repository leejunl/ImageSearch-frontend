import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)

app.use(router)

axios.defaults.headers.common['TOKEN'] = localStorage.getItem('token')

app.mount('#app')




