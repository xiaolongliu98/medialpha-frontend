import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/pages/MainPage";
import VideoPage from "@/pages/VideoPage";


const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {name: 'default', path: '/', redirect: '/main', },
        {name: "main", path: '/main', component: MainPage},
        {name: "video", path: '/video/:id', component: VideoPage},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/noRoute') {
        return
    }
    next()
})

export default router;