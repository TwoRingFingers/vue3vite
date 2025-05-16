<template>
    <el-aside :width="width"
              class="el-aside-sty">
        <el-menu background-color="#545c64"
                 class="el-menu-vertical-demo"
                 default-active="/home"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 text-color="#fff">
            <h3 v-show="isCollapse">收缩</h3>
            <h3 v-show="!isCollapse">展开</h3>
            <el-menu-item v-for="item in noChildren"
                          :index="item.path"
                          default-active="1"
                          :key="item.path">
                <component class="icons"
                           :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>

            <el-sub-menu v-for="item in hasChildren"
                         :index="item.path"
                         :key="item.path">
                <template #title>
                    <component class="icons"
                               :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item v-for="(subItem, index) in item.children"
                                  :index="index"
                                  :key="subItem.path">
                        <component class="icons"
                                   :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup>
import { computed, reactive } from 'vue';
import { useAllDataStore } from '@/store';

const model = reactive({
    // isCollapse: true
});

const list = reactive([
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: 'Home'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'User'
    },
    {
        path: 'other',
        label: '其他',
        icon: 'location',
        children: [
            {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Page1'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Page2'
            }
        ]
    }
]);

const noChildren = computed(() => list.filter((item) => !item.children));
const hasChildren = computed(() => list.filter((item) => item.children));

const store = useAllDataStore();
const isCollapse = computed(() => store.state.isCollapse); //展开关闭
const width = computed(() => (store.state.isCollapse ? '64px' : '180px')); //折叠展开的宽度width
</script>

<style scoped lang="less">
.icons {
    width: 18px;
    margin-right: 5px;
}
.el-menu {
    border-right: none;
    height: 100%;
    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
.el-aside {
    height: 100%;
    background: #545c64;
}
.el-aside-sty {
    transition: width 0.5s ease-in-out; /* 菜单栏宽度变化的过渡效果 */
    overflow: hidden;
}
</style>
