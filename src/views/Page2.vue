<template>
    <div class="page2">
        <el-card style="width: 500px">
            <template #header>
                <div class="card-header">
                    <slot name="headerslot">秋天到了</slot>
                </div>
            </template>
            <slot name="contentslot">
                <p v-for="o in 4"
                   :key="o"
                   class="text item">{{ 'List item ' + o }}</p>
            </slot>
            <template #footer>
                <slot name="footerslot">Footer content</slot>
            </template>

        </el-card>

    </div>

</template>

<script setup  >
import { inject } from 'vue';
const message = inject('message');
console.log(message);
</script>
<style lang="less" scoped>
.page2 {
    width: 200px;
    // height: 50px;
    // border: 1px red solid;
    .box-header {
        font-size: 16px;
        line-height: 80px;
    }
    .box-content {
    }
    .box-floot {
    }
}
</style>