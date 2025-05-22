<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small"
                       @click="handleCollapse">
                <!-- icon  通过component包裹 is必填 -->
                <component class="icons"
                           :is="'menu'"></component>
            </el-button>
            <el-breadcrumb separator="/"
                           class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current"
                                    :to="current.path">{{current.label}}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getimgageUrl('user')"
                         class="user">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleClose">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue';
import { useAllDataStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';

const store = useAllDataStore();

const current = computed(() => store.state.currentMenu);
const model = reactive({
    tabactive: true
});
const router = useRouter();
const handleCollapse = () => {
    store.state.isCollapse = !store.state.isCollapse;
};
const handleClose = () => {
    store.LogOut();
    router.push('login');
};
//图片动态拿取，从images文件夹拿取
const getimgageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
</script>

<style scoped lang="less">
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #333;
    .icons {
        width: 20px;
        height: 20px;
    }

    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
:deep(.bread span) {
    color: #fff !important;
    cursor: pointer !important;
}
</style>
