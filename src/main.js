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
// 引入vue-mini-player
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css

const app = createApp(App)
// 申明使用插件
app.use(ElementPlus)
    .use(router)
    .use(store)
    .use(vue3videoPlay)
    // .use(mavonEditor)

app.config.warnHandler = () => null;
app.mount('#app')

console.log("@version: ", "Medialpha-1.0")