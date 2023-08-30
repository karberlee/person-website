import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { get, post } from "./common/api"

const app = createApp(App)

app.config.globalProperties.$get = get
app.config.globalProperties.$post = post

app.use(router)

app.mount('#app')
