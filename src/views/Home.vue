<template>
    <el-row :gutter="20"
            class="home">
        <el-col :span="8"
                class="col-sty">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')"
                         class="userimg">
                    <div class="user-info">
                        <p class="user-name">admin</p>
                        <p class="user-role">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间 <span>2025:04:05 12:00:22</span></p>
                    <p>上次登录地点 <span>北京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover"
                     class="card-table">
                <home-list :tablelist="model.tablelist"
                           :tableLabel="model.tableLabel"></home-list>
            </el-card>

        </el-col>

    </el-row>

</template>

<script setup>
import { reactive } from 'vue';
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
import HomeList from '@/components/home/homeList.vue';

const model = reactive({
    tablelist: [
        {
            name: 'Java',
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300
        },
        {
            name: 'Python',
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300
        }
    ],
    tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
    }
});

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .col-sty {
        margin-top: 20px;
    }
    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        padding-bottom: 20px;
        .userimg {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .user-info {
            p {
                line-height: 40px;
            }
        }
        .user-role {
            color: #999;
        }
        .user-name {
            font-size: 35px;
        }
    }
    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .card-table {
        margin-top: 20px;
        height: 100%;
    }
}
</style>
