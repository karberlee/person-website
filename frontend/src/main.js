import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/css/index.scss";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import router from "./router"
import { get, post } from "./common/api"

const app = createApp(App)

app.config.globalProperties.$get = get
app.config.globalProperties.$post = post

// app.use(ElementPlus)
app.use(router)

app.mount('#app')
