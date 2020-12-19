import axios from "axios";
console.log('&&&&&&&&&&&&&&&&&&&&&&', process.env.VUE_APP_ZHAOTEST)
console.log('&&&&&&&&&&&&&&&&&&&&&&=======================')
const URL = 'https://tulong.maxxiang.com';
// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? URL : "cp",
    timeout: 150000
});
window.axiosPromiseList = [];//用来存放所有请求的数组
service.interceptors.response.use(
    res => {
        //请求正常则返回
        return Promise.resolve(res);
    },
    error => {
        return Promise.reject(error);
    }
);
service.interceptors.request.use(
    config => {
        // console.log('请求配置信息JJJJ', config)
        config.cancelToken = new axios.CancelToken(cancel => {
            let hasOne = window.axiosPromiseList.find(item => item.url === config.url);//验证是否已经存在
            window.axiosPromiseList.push({ url: config.url, cancel });
        })
        return config;
    },
    error => {
        console.log('请求出错JJJJ', error)
        return Promise.reject(error)
    }
)
export default service;
