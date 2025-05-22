import { mock } from 'mockjs';

const env = import.meta.env.MODE || 'prod';

const EnvConfig = {
    development: {
        //开发环境
        baseApi: '/api',
        mockApi: 'xxx'
    },
    test: {
        baseApi: '/api',
        mockApi: ''
    },
    prod: {
        //生产环境
        baseApi: '/api',
        mockApi: ''
    }
};
export default {
    env,
    ...EnvConfig[env],
    //mock
    mock: false //总的mock开关
};
