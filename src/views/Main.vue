<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 左侧自定义组件 -->
            <!-- <el-aside width="200px">Aside</el-aside> -->
            <common-aside />
            <el-container>
                <el-header class="el-header">
                    <common-header />
                </el-header>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
</script>

<style lang="less" scoped>
.common-layout {
    height: 100%;
}
.lay-container {
    height: 100%;
}
.el-header {
    background-color: #333;
}
</style>
