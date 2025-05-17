<template>
  <div class="wapper-table">
    <el-table :data="tablelist">
      <el-table-column
        v-for="(item, index) in tableLabel"
        :prop="index"
        :key="index"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script setup>
defineProps({
  tablelist: {
    type: Array,
  },
  tableLabel: {
    type: Object,
  },
});
</script>

<style lang="less" scoped>
.wapper-table {
  flex: 1;
  overflow: hidden;
}
</style>
