<template>
  <div class="container">
    <div class="handle-box">
      <el-input  placeholder="教师口令" class="handle-input mr10"></el-input>
      <el-input  placeholder="教师名" class="handle-input mr10" style="margin-left: 20px"></el-input>
      <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
    </div>
    <el-card>
      <el-row gutter="20">
        <el-col :span="7">
          <p>姓名：</p>
          <p>教师所属学院：</p>
          <p>创建人：</p>
        </el-col>
        <el-col :span="7">
          <p>教师所属学校：</p>
          <p>教师口令：</p>
          <p>创建人身份：</p>
        </el-col>
        <el-col :span="7">
          <p>职称：</p>
          <p>邮箱：</p>
          <p>手机号：</p>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" class="addClassPerson">添加成员</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="schart-box">
      <div class="content-title">教师授课班级详情饼状图</div>
      <schart class="schart" canvasId="pie" :options="options3"></schart>
    </div>
    <div class="schart-box" >
      <div class="content-title">教师课程环形图</div>
      <schart class="schart" canvasId="ring" :options="options4"></schart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Schart from 'vue-schart';
import {Search} from "@element-plus/icons-vue";
const options3 = {
  type: 'pie',
  title: {
    text: '教师授课班级详情饼状图'
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
    text: '教师课程环形图'
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
const handleSearch =()=>{

}
</script>

<style scoped>
.container{
  //height: 90%;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  height: 40px;
}
p{
  margin: 60px 0 30px 60px;
  font-size: 20px;
}

.addClassPerson{
  width: 150px;
  height: 50px;
}
.search-button{
  width: 120px;
  height: 40px;
  margin-left: 30px;
}
.schart-box {
  display: inline-block;
  margin: 20px 100px 0 100px;
}
.schart {
  width: 800px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
