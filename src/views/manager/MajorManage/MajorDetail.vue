<template>
  <div class="container">
    <div class="handle-box">
      <el-input  placeholder="专业口令" class="handle-input mr10"></el-input>
      <el-input  placeholder="专业名" class="handle-input mr10" style="margin-left: 20px"></el-input>
      <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
    </div>
    <el-card>
      <el-row gutter="20">
        <el-col :span="7">
          <p>专业名：</p>
          <p>创建人：</p>
        </el-col>
        <el-col :span="7">
          <p>专业口令：</p>
          <p>创建人身份：</p>
        </el-col>
        <el-col :span="7">
          <p>专业人数：</p>
          <p>专业状态：</p>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" class="addClassPerson">添加班级</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="schart-box">
      <div class="content-title">专业班级详情饼状图</div>
      <schart class="schart" canvasId="pie" :options="options3"></schart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Schart from 'vue-schart';
import {Search} from "@element-plus/icons-vue";
const options3 = {
  type: 'pie',
  title: {
    text: '专业班级详情饼状图'
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
const handleSearch = ()=>{

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
