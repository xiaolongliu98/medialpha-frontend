import axios from "axios";
// import store from "@/store"
// import router from "@/router/router";

export const baseURL = {
    local: 'http://localhost:8081/v1',
}['local']

const req = axios.create({
    baseURL,
    timeout: 4000,
    // headers: {},
})

// 配置请求前 在header携带鉴权信息
// req.interceptors.request.use(
//     config => {
//         // config.headers = {
//         //     'Content-type': 'application/json;charset=UTF-8'
//         // }
//         config.headers['Content-type'] = 'application/json;charset=UTF-8'
//         if (store.getters['userLogged']) {
//             config.headers.Uid = `Bearer ${store.state.userInfo.uid}`
//             config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// 配置Resp拦截器，主要判断是否鉴权失效
// req.interceptors.response.use(
//     function (response) {
//         // 响应成功（响应状态码是 2xx）时执行第一个回调函数
//         // console.log('响应成功....')
//         return response
//     }, async function (error) {
//         // 网络异常或响应失败(响应状态码是非2开头)时执行第二个回调函数
//         // console.log('响应失败....')
//         // 1. 判断响应的状态码是不是401，如果不是401就不用做任何处理
//         if (error.response && error.response.status === 401) {
//             // 2. 如果是401，就先清空token, 并跳转到登录页
//             await store.dispatch('logout')
//             router.push('/main/market')
//         }
//         return Promise.reject(error)
//     }
// )
export default req