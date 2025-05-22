import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); //pinia 持久化插件

//编写pinai插件，插件也就是一个函数
//为store添加公共属性第一种方法，直接return
//添加的值也具有响应式
pinia.use((context) => {
    //plugins 插件上下文
    console.log(context);
    //   context.pinia // 使用 `createPinia()` 创建的 pinia
    //   context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
    //   context.store // 插件正在扩充的 store  【用的最多】
    //   context.options // 定义存储的选项对象传递给`defineStore()`
    //添加公共属性第一种方法，直接return
    return {
        author: '公共属性第一种方式',
        pub1: () => {
            return 'pub1';
        }
    };
});
//第二种，通过结构store，直接复制
pinia.use(({ store }) => {
    store.author2 = '公共属性第二种方式';
});

//pinia添加公共方法，操作类似
pinia.use(({ store }) => {
    store.pub2 = () => {
        return 'pub2';
    };
});
export default pinia;
