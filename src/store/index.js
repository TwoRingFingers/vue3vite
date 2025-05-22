import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

function initState() {
    return {
        isCollapse: false,
        tags: [
            //动态标签
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null, //面包屑
        menuList: [], //菜单-
        token: '',
        routerList: []
    };
}

export const useAllDataStore = defineStore(
    'counter',
    () => {
        //对比
        //ref state 属性
        //computed getters
        //function actions
        const state = ref(initState());

        //对state持久化存储
        //使用pinia插件持久化后，就不需要手动存储了
        // watch(
        //     state,
        //     (newObj) => {
        //         if (!newObj.token) {
        //             return;
        //         } else {
        //             localStorage.setItem('store', JSON.stringify(newObj));
        //         }
        //     },
        //     {
        //         deep: true
        //     }
        // );

        //增加标签
        function selectMenu(val) {
            if (val.name === 'home') {
                state.value.currentMenu = null;
            } else {
                state.value.currentMenu = val;
                let index = state.value.tags.findIndex((item) => item.name === val.name);
                index === -1 ? state.value.tags.push(val) : '';
            }
        }
        //更改标签
        function updateTags(val) {
            let index = state.value.tags.findIndex((item) => item.name === val.name);
            state.value.tags.splice(index, 1);
        }

        //更改菜单
        function upadteMenyList(val) {
            state.value.menuList = val;
        }
        //添加动态路由
        function addMenu(router, type) {
            //使用pinia插件持久化后，就不需要手动存储了
            // if (type == 'refresh') {
            //     if (JSON.parse(localStorage.getItem('store'))) {
            //         state.value = JSON.parse(localStorage.getItem('store'));
            //         state.value.routerList = [];
            //     } else {
            //         return;
            //     }
            // }
            //获取到用户菜单
            const menu = state.value.menuList;
            //根据菜单，去项目找相关的组件
            const module = import.meta.glob('../views/**/*.vue');
            // const module = import.meta.glob(['../views/**/*.vue', '../components/test/**/*.vue']);

            const routeArr = [];
            //遍历菜单
            menu.forEach((item) => {
                //判断是否有子节点
                if (item.children) {
                    item.children.forEach((val) => {
                        let url = `../views/${val.url}.vue`;
                        val.component = module[url];
                        routeArr.push(...item.children);
                    });
                } else {
                    let url = `../views/${item.url}.vue`;
                    item.component = module[url];
                    routeArr.push(item);
                }
            });
            state.value.routerList = [];
            const routers = router.getRoutes();
            //多账号登录  router缓存问题
            routers.forEach((item) => {
                //判断主页和login
                if (item.name == 'main' || item.name == 'login' || item.name == '404') {
                    return;
                } else {
                    //重复路由删除掉
                    router.removeRoute(item.name);
                }
            });

            routeArr.forEach((item) => {
                // 添加到main主页面下面
                state.value.routerList.push(router.addRoute('main', item));
            });
        }
        //退出登录
        function LogOut() {
            // store.value.token = '';
            //清除路由
            state.value.routerList.forEach((item) => {
                if (item) {
                    item();
                }
            });
            state.value = initState(); //恢复默认结构
            localStorage.removeItem('store'); //清除缓存
        }

        return { state, selectMenu, updateTags, upadteMenyList, addMenu, LogOut };
    },
    {
        //defineStore实例，第三个参数
        persist: true //支持pinia持久化开关
    }
);
