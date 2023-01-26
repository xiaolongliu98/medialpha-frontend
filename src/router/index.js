import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/pages/MainPage";


const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {name: 'default', path: '/', redirect: '/main', },
        {name: "main", path: '/main', component: MainPage},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/noRoute') {
        return
    }
    next()
})

export default router;