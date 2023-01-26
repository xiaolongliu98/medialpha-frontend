import { createApp } from 'vue'
import App from './App.vue'
// 引入Element插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入vue-router插件
import router from '@/router'
// 引入vuex-store
import store from "@/store";
// 引入mavon-editer
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'


const app = createApp(App)
// 申明使用插件
app.use(ElementPlus)
    .use(router)
    .use(store)
    // .use(mavonEditor)

app.config.warnHandler = () => null;
app.mount('#app')

console.log("@version: ", "Medialpha-1.0")