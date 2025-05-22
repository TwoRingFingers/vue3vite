<template>
    <div class="userPage">
        <div class="header-row">
            <el-button type="primary"
                       @click="addopen()">新增</el-button>
            <el-form :inline="true"
                     :model="form">
                <el-form-item label="用户名 ">
                    <el-input placeholder="请输入用户名"
                              v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="warpper-table">
            <el-table :data="model.datalist"
                      style="width: 100%"
                      class="table-sty">
                <el-table-column v-for="item in model.tableLabel"
                                 :key="item.prop"
                                 :width="item.width ? item.width : 125"
                                 :prop="item.prop"
                                 :label="item.label" />

                <el-table-column fixed="right"
                                 label="操作"
                                 min-width="120">
                    <template #="scope">
                        <el-button link
                                   type="primary"
                                   size="small"
                                   @click="updateopen(scope.row)"> 编辑 </el-button>

                        <el-popconfirm title="确定删除吗？"
                                       @confirm="deleteFun(scope.row)">
                            <template #reference>
                                <el-button link
                                           type="primary"
                                           size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pager"
                           background
                           layout="prev, pager, next"
                           :total="config.total"
                           size="small"
                           @current-change="handleChange" />
        </div>
        <user-add ref="DiaRef"
                  @subuse="subuse"></user-add>
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { getUserData, deleteUser } from '@/api/api';

import userAdd from '../components/user/userDialog.vue';
const { proxy } = getCurrentInstance();
const form = reactive({
    name: ''
});
const config = reactive({
    name: '',
    page: 1,
    total: 0
});
const model = reactive({
    datalist: [],
    tableLabel: [
        {
            prop: 'name',
            label: '姓名'
        },
        {
            prop: 'age',
            label: '年龄'
        },
        {
            prop: 'sexLabel',
            label: '性别'
        },
        {
            prop: 'birth',
            label: '出生日期',
            width: 200
        },
        {
            prop: 'addr',
            label: '地址',
            width: 400
        }
    ]
});
const DiaRef = ref(null);

const handleChange = (page) => {
    config.page = page;
    getUserFun();
};
const getUserFun = async () => {
    const res = await getUserData(config);
    model.datalist = res.list.map((item) => ({
        ...item,
        sexLabel: item.sex == 1 ? '男' : '女'
    }));
    config.total = res.count;
};
const handleSearch = () => {
    config.name = form.name;
    getUserFun();
};
//删除
const deleteFun = async (val) => {
    await deleteUser({ id: val.id });
    getUserFun();
};
//新增
const addopen = async () => {
    DiaRef.value.handleAdd(); // 调用子组件的方法
    // await proxy.$refs['addRef'].handleAdd();
};
//编辑
const updateopen = async (row) => {
    DiaRef.value.handleUpdate(row);
};

const subuse = () => {
    getUserFun();
    console.log('调用成功');
};
onMounted(() => {
    getUserFun();
});
</script>

<style lang="less" scoped>
.userPage {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-direction: column;
    height: 100%;

    .header-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .warpper-table {
        flex: 1;
        overflow: hidden;
        position: relative;
        .table-sty {
            height: calc(100% - 50px);
        }
        .pager {
            position: absolute;
            right: 0;
            height: 50px;
        }
    }
}
</style>
