/**
 *  整个项目api的统一管理
 */
import request from '../util/request';

const prefixurl = '/api';
//请求首页左侧表格的数据
export function getTableData() {
    return request({
        url: '/home/getTableData',
        method: 'get'
    });
}
//homg右边tab数据
export function getCountData() {
    return request({
        url: '/home/getCountData',
        method: 'get'
    });
}
//home echart 数据
export function getChartData() {
    return request({
        url: '/home/getChartData',
        method: 'get'
    });
}
//查询用户
export function getUserData(data) {
    return request({
        url: '/user/getUserData',
        method: 'get',
        data
    });
}
//删除用户
export function deleteUser(data) {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        data
    });
}
//新增用户
export function addUser(data) {
    return request({
        url: '/user/addUser',
        method: 'post',
        data
    });
}
//编辑用户
export function editUser(data) {
    return request({
        url: '/user/editUser',
        method: 'post',
        data
    });
}

//
export function getMenu(params) {
    return request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    });
}
