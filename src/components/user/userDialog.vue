<template>
    <el-dialog v-model="model.dialogVisible"
               destroy-on-close
               :title="model.action == 'add' ? '新增用户' : '编辑用户'"
               width="35%"
               :before-close="handleClose">
        <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
        <el-form :model="formUser"
                 :inline="true"
                 :rules="rules"
                 ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名"
                                  prop="name">
                        <el-input v-model="formUser.name"
                                  placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄"
                                  prop="age">
                        <el-input v-model.number="formUser.age"
                                  placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item class="select-clearn"
                                  label="性别"
                                  prop="sex">
                        <el-select v-model="formUser.sex"
                                   placeholder="请选择">
                            <el-option label="男"
                                       value="1" />
                            <el-option label="女"
                                       value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期"
                                  prop="birth">
                        <el-date-picker v-model="formUser.birth"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        placeholder="请输入"
                                        style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址"
                              prop="addr">
                    <el-input v-model="formUser.addr"
                              placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end">
                <el-form-item>
                    <el-button type="primary"
                               @click="handleCancel">取消</el-button>
                    <el-button type="primary"
                               @click="onSubmit()">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { reactive, getCurrentInstance, ref, nextTick } from 'vue';
import { addUser, editUser } from '@/api/api';
const { proxy } = getCurrentInstance();

const emit = defineEmits(['subuse']);

const model = reactive({
    dialogVisible: false,
    action: 'add'
    // defaultData: {
    //     name: '',
    //     age: null,
    //     sex: null,
    //     birth: '',
    //     addr: ''
    // }
});
const userForm = ref(null);
const formUser = reactive({});
const rules = reactive({
    name: [{ required: true, message: '姓名是必填项', trigger: 'blur' }],
    age: [
        { required: true, message: '年龄是必填项', trigger: 'blur' },
        { type: 'number', message: '年龄必须是数字' }
    ],
    sex: [{ required: true, message: '性别是必选项', trigger: 'change' }],
    birth: [{ required: true, message: '出生日期是必选项' }],
    addr: [{ required: true, message: '地址是必填项' }]
});

const onSubmit = async () => {
    // await formEl.validate();
    console.log(formUser);

    try {
        await userForm.value.validate();
        if (model.action == 'add') {
            await addUser(formUser);
        } else {
            await editUser(formUser);
        }
        ElMessage.success('保存成功');
        emit('subuse');
    } catch (error) {
        console.log(error);
    } finally {
        model.dialogVisible = false;
        userForm.value.resetFields();
    }

    // await proxy.$refs['userForm'].validate();
};
const handleAdd = () => {
    model.action = 'add';

    //打开对话窗
    model.dialogVisible = true;
};

const handleUpdate = (data) => {
    model.action = 'update';
    model.dialogVisible = true;
    nextTick(() => {
        Object.assign(formUser, { ...data, sex: '' + data.sex });
    });
};
const handleClose = () => {
    //获取到表单dom，执行resetFields重置表单
    console.log('重置表单 ');
    userForm.value.resetFields();
    // proxy.$refs['userForm'].resetFields();
    //关闭对话框
    model.dialogVisible = false;
};
//对话框右下角的取消事件
const handleCancel = () => {
    console.log('重置表单 ');
    userForm.value.resetFields();
    // proxy.$refs['userForm'].resetFields();

    model.dialogVisible = false;
};
defineExpose({
    handleAdd,
    handleUpdate
});
</script>

<style lang="less" scoped>
.select-clearn {
    display: flex;
}
</style>
