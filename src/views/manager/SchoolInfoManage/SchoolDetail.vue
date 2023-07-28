<template>
  <div class="container">

    <!--echart 详情图-->
    <div class="schart-box">
      <div class="content-title">学院专业数详情饼状图</div>
      <schart class="schart" canvasId="pie" :options="options3"></schart>
    </div>
    <div class="schart-box" >
      <div class="content-title">专业班级信息环形图</div>
      <schart class="schart" canvasId="ring" :options="options4"></schart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Schart from 'vue-schart';
import {ref} from "vue";
import {UploadProps, UploadUserFile} from "element-plus";
const options3 = {
  type: 'pie',
  title: {
    text: '学院专业数详情饼状图'
  },
  legend: {
    position: 'center'
  },
  bgColor: '#fbfbfb',
  labels: ['课程数量', '人数', '男生人数', '女生人数'],
  datasets: [
    {
      data: [334, 278, 190, 235]
    }
  ]
};
const options4 = {
  type: 'ring',
  title: {
    text: '专业班级信息环形图'
  },
  showValue: false,
  legend: {
    position: 'bottom',
    bottom: 40
  },
  bgColor: '#fbfbfb',
  labels: ['软件工程导论', '计算机组成原理', 'java程序设计','c语言程序设计'],
  datasets: [
    {
      data: [500, 500, 500,500]
    }
  ]
};

</script>

<style scoped>

p{
  margin: 60px 0 30px 60px;
  font-size: 20px;
}


.schart-box {
  display: inline-block;
  margin: 20px 100px 0 100px;
}
.schart {
  width: 600px;
  height: 400px;
  margin-right: 20px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}


.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

</style>
