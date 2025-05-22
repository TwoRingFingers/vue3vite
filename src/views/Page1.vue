<template>
    <div>
        <el-button @click="isshow = !isshow">加载组件</el-button>
        <!-- <page2 v-if="isshow"></page2> -->

        <div class="page-box">
            <div>插槽</div>
            <page-2>
                <!-- 具名插槽实现 -->
                <template v-slot:headerslot>过冬天</template>
                <!-- 简写 # -->
                <!-- <template #headerslot>过冬天</template> -->
                <template #contentslot>
                    <span>这是内容</span>
                </template>
            </page-2>
        </div>

    </div>
</template>

<script lang="ts" setup  >
import { defineAsyncComponent, ref, provide } from 'vue';
import { useAllDataStore } from '@/store';
const store = useAllDataStore();
console.log(store);

provide(/* 注入名 */ 'message', /* 值 */ 'hello!');

import page2 from './Page2.vue';

// 异步组件 defineAsyncComponent 返回一个Promise   ===定义-异步-组成
//不会在初始化时渲染，
// const page2 = defineAsyncComponent(() => import('./Page2.vue'));
const isshow = ref(false);
</script>
<style lang="less" scoped>
.page-box {
    // border: 1px red solid;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
}
</style>