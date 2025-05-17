/**
 *  整个项目api的统一管理
 */
import request from "../util/request";

const prefixurl = '/api';
//请求首页左侧表格的数据
export function getTableData() {
    return request({
        url: "/home/getTableData",
        method: 'get',
    })
}
//homg右边tab数据
export function getCountData() {
    return request({
        url: "/home/getCountData",
        method: 'get',

    })
}
//home echart 数据
export function getChartData() {
    return request({
        url: "/home/getChartData",
        method: 'get',
    })
}

export function getUserData(data) {
    return request({
        url: "/user/getUserData",
        method: 'get',
        data,
    })
}
export function deleteUser(data) {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        data
    })
}


