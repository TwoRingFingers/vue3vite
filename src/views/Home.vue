<template>
  <!-- gutter是间隔，不是等份 -->
  <el-row :gutter="20" class="home">
    <el-col :span="8" class="col-sty">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="userimg" />
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
      <el-card shadow="hover" class="card-table">
        <home-list
          :tablelist="model.tablelist"
          :tableLabel="model.tableLabel"
        ></home-list>
      </el-card>
    </el-col>
    <el-col :span="16" class="col-sty">
      <div class="card-bor">
        <el-card
          class="count-card"
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in model.countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart">
        <div ref="echartTop" style="height: 280px"></div>
      </el-card>
      <div class="geaph">
        <el-card>
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import HomeList from "@/components/home/homeList.vue";
import * as echarts from "echarts";

const { proxy } = getCurrentInstance();

import { getTableData, getCountData, getChartData } from "@/api/api"; //接口
const model = reactive({
  tablelist: [],
  tableLabel: {
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
  },
  countData: [],
});
const echartTop = null;
const userEchart = null;
const videoEchart = null;

const observer = ref(null);
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});

const getData = async () => {
  const res = await getTableData();

  model.tablelist = res.tableData;
};
const getCountDataFun = async () => {
  const res = await getCountData();
  model.countData = res;
};
const getChartDataFun = async () => {
  const { orderData, userData, videoData } = await getChartData();
  xOptions.xAxis.data = orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map((val) => {
    return {
      name: val,
      data: orderData.data.map((item) => item[val]),
      type: "line",
    };
  });
  const topEchart = echarts.init(proxy.$refs["echartTop"]);
  topEchart.setOption(xOptions);

  //第二个echart
  xOptions.xAxis.data = userData.map((item) => item.date);
  xOptions.series = [
    { name: "新增用户", data: userData.map((item) => item.new), type: "bar" },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ];
  const userEchart = echarts.init(proxy.$refs["userEchart"]);
  userEchart.setOption(xOptions);

  //第三个echart
  pieOptions.series = [
    {
      data: videoData,
      type: "pie",
    },
  ];
  const videoEchart = echarts.init(proxy.$refs["videoEchart"]);
  videoEchart.setOption(pieOptions);

  //new ResizeObserver  监听容器大小变化
  observer.value = new ResizeObserver(() => {
    topEchart.resize();
    userEchart.resize();
    videoEchart.resize();
  });
  if (proxy.$refs["echartTop"]) {
    observer.value.observe(proxy.$refs["echartTop"]);
  }
};
onMounted(() => {
  getData();
  getCountDataFun();
  getChartDataFun();
});
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .col-sty {
    // margin-top: 20px;
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
  .card-bor {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .count-card {
      width: 32%;
      margin-bottom: 20px;
    }

    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }
  .geaph {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}
</style>
