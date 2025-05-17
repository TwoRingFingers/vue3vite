import Mock from 'mockjs';
import homeapi from './mockData/home'
import userapi from './mockData/user'
//1.拦截的路径 2.方法 3.制造的假数据
Mock.mock(/api\/home\/getTableData/, 'get', homeapi.getTableData);
Mock.mock(/api\/home\/getCountData/, 'get', homeapi.getCountData);
Mock.mock(/api\/home\/getChartData/, 'get', homeapi.getChartData);
//用户查询
Mock.mock(/api\/user\/getUserData/, 'get', userapi.getUserList);
//user用户删除
Mock.mock(/api\/user\/deleteUser/, 'get', userapi.deleteUser);
