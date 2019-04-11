import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'
const SUCCESS_CODE = 0;


// 创建axios实例
const service = axios.create({
    baseURL: "http://www.linkjb.com/linkjb/", // api的base_url
    timeout: 5000 // 请求超时时间
})


// request拦截器
service.interceptors.request.use( config => {

    if(store.getters.token){
        config.headers.Authorization = getToken();
    }


    if(config.method.toLowerCase() !== 'get' && Object.keys(config.data).length > 0){
        let biz_content = {};
        let data = {};

        for(let key in config.data){
            if(key != 'method'){
                biz_content[key] = config.data[key];
            }
        }

        data = {
            biz_content:JSON.stringify(biz_content)
        }
        if(getToken()){
            data.ticket = getToken() || '';
        }

        config.data = {
            ...data
        }
    }

    return config
},error => {
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use( response => {

    const res = response.data;

    if(!res.hasOwnProperty('return_code')){
        return res;
    }

    if (res.return_code == SUCCESS_CODE) {
        console.log(JSON.parse(res.biz_content),"rrrr")
        return JSON.parse(res.biz_content);

    }

    if(res.return_code == '803' || res.return_code == '802'){
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            store.dispatch('FedLogOut').then(() => {
                location.reload()// 为了重新实例化vue-router对象 避免bug
            })
        })
        return Promise.reject({code:res.return_code,message:res.return_msg})
    }

    Message({
        message: res.return_msg,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject({code:res.return_code,message:res.return_msg})

},error => {

    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject({code:res.return_code,message:error.message})
})
export default service
