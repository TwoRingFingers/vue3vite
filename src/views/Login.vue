<template>
    <div class="body-login">
        <el-form :model="loginForm"
                 class="form-sty">
            <h1 class="h1-sty">欢迎登录</h1>
            <el-form-item>
                <el-input type="input"
                          placeholder="请输入账号"
                          v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password"
                          placeholder="请输入密码"
                          v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="loginBtn()">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script  setup  >
import { reactive } from 'vue';
import { getMenu } from '@/api/api';
import { useAllDataStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const store = useAllDataStore();

const router = useRouter();
const loginForm = reactive({
    username: '',
    password: ''
});

const loginBtn = async () => {
    try {
        const res = await getMenu(loginForm);
        store.upadteMenyList(res.menuList);
        store.state.token = res.token;
        store.addMenu(router); //先添加路由
        router.push('/home'); //再跳转页面
    } catch (error) {
        ElMessage.error(error);
    }
};
</script>
<style lang="less" scoped>
.body-login {
    width: 100%;
    height: 100%;
    background-image: url('../assets//images/background.png');
    background-size: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    .h1-sty {
        margin-bottom: 20px;
        text-align: center;
    }
    .form-sty {
        width: 350px;
        height: 250px;
        margin: auto;
        background-color: #fff;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #cacaca;
    }
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>