/*
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken,getLocalStorage } from '@/utils/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(( to, from, next) => {
    NProgress.start()
    if(getToken()){
        if(to.path == '/login'){
            next({path:'/'})
            NProgress.done();
        }else{
            if(Object.keys(getLocalStorage('operatorInfo')).length > 0){
                next()
            }else{
                store.dispatch('FedLogOut').then(() => {
                    next({ path: '/login' })
                })
            }
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }

    router.afterEach(() => {
        NProgress.done() // 结束Progress
    })
})*/
