import axios from "axios";
import { ElMessage } from 'element-plus'
import config from '@/config'
const service = axios.create({
    baseURL: config.baseApi
});

const NETWORK_ERROR = '网络错误';
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器   请求拿到后，进行处理
service.interceptors.response.use((res) => {
    const { code, data, mes } = res.data;
    //对接口的结构进行整理
    if (code === 200) {
        return data
    } else {
        ElMessage.error(mes || NETWORK_ERROR);
        return Promise.reject(mes || NETWORK_ERROR)
    }
});
function request(options) {
    options.method = options.method || 'get'
    //get参数请求调整
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    //对mock开关做处理
    let isMock = config.mock;

    if (typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }
    //针对环境处理  
    if (config.env === 'prod') {
        //如果是生产环境，不能使用mock
        service.defaults.baseURL = config.baseApi
    } else {
        //除开生产环境外，如果mock打开就调用mockApi,否则调测试接口
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request;