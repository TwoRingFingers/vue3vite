<template>
    <div class="tags">
        <el-tag v-for="(item,index) in tags"
                :key="item.name"
                class="tag-sty"
                :closable="item.name !== 'home'"
                :effect="route.name === item.name ? 'dark' :'plain'"
                @click="totag(item)"
                @close="handleClose(item,index)">
            {{item.label}}
        </el-tag>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '@/store';
//引入pinia
const store = useAllDataStore();
//动态拿取全局tags
const tags = computed(() => store.state.tags);
const route = useRoute();
const router = useRouter();

const totag = (item) => {
    router.push(item.path);
};
const handleClose = (item, index) => {
    store.updateTags(item);

    //如果关闭不是当前tab，直接关闭
    if (item.name !== route.name) return;

    //如果关闭的是最后一个，就跳到上一个
    if (index === store.state.tags.length) {
        store.selectMenu(tags.value[index - 1]);
        router.push(tags.value[index - 1].name);
        console.log(tags.value[-1].name);
    } else {
        //不是最后一个，就取当前index,
        store.selectMenu(tags.value[index]);
        router.push(tags.value[index].name);
    }

    // // 如果关闭tab不是当前页，跳到默认页面，
    // if (item.name == route.name) {
    //     router.push('/');
    // }
};
</script>

<style lang="less" scoped>
.tags {
    margin: 20px 0 0 20px;
    cursor: pointer;
}
.el-tag {
    margin-right: 10px;
}
</style>