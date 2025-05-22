# Vue 3 + Vite

【动态组件+持久化】用途 tab 切换展示
动态组件标签 <component  :is=""></compoent>
is 就是要动态解析的组件

````vue
import test from 'test.vue';

<component  :is="test"></compoent>
//此时切换还是会挂载和卸载

==添加持久化 keep-alive包裹
```vue
<keep-alive>
<component  :is="test"></compoent>
<keep-alive>


【模板引用】
vue是mvvm的架构设计，通过模型与数据的双向驱动模式，修改数据间接修改了页面
1、应用场景  操作底层dom时，通过模板引用实现

2、使用案例
输入框获取焦点

【pinia】
1.actions理解
actions可以理解为store中的methods(也就是函数)

2.定义和使用actions


【组件局部注册】
在页面直接import导入使用

【全局组件注册】
vue.component("组件名称","组件对象")

【solt插槽】
 插槽的定义    `<slot>秋天到了</slot>`
 <组件标签>
向插槽写入内容
 </组件标签>
````
