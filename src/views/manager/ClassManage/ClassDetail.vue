<template>
  <div class="container">
    <div class="handle-box">
      <el-input  placeholder="班级口令" class="handle-input mr10" v-model="queryForm.uuid"></el-input>
      <el-input  placeholder="班级名" class="handle-input mr10" style="margin-left: 20px" v-model="queryForm.clazzName"></el-input>
      <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
    </div>
    <el-card>
      <el-row gutter="20">
        <el-col :span="7">
          <p>班级名：{{$route.params.className}}</p>
          <p>班级所属专业：{{$route.params.classMajor}}</p>
          <p>创建人：{{$route.params.classCreateMan}}</p>
        </el-col>
        <el-col :span="7">
          <p>班级所属学校：{{$route.params.classSchool}}</p>
          <p>班级口令：{{$route.params.uuid}}</p>
          <p>创建人身份：学校管理员</p>
        </el-col>
        <el-col :span="7">
          <p>班级所属学院：{{$route.params.classDepartment}}</p>
          <p>班级人数：{{$route.params.classPersonNumber}}</p>
          <p>班级状态：
            <span v-if="$route.params.status == 0">已创建</span>
            <span v-if="$route.params.status == 1">销毁</span>
          </p>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" class="addClassPerson" @click="addPerson">添加成员</el-button>
          <el-button type="primary" class="addClassPerson" @click="addCourse">添加课程</el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="schart-box">
      <div class="content-title">班级详情饼状图</div>
      <schart class="schart" canvasId="pie" :options="options3"></schart>
    </div>
  </div>
</template>

<script setup lang="ts">
import Schart from 'vue-schart';
import {Search} from "@element-plus/icons-vue";
import {reactive,ref} from "vue";
import {classList} from "../../../api/Manager/ClassManageApi";
import {manager} from "../../../store/manager";
import router from "../../../router";

const options3 = {
  type: 'pie',
  title: {
    text: '班级详情饼状图'
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
const managerInfo = manager()
//query form
const queryForm = reactive({
  uuid:'',
  clazzName:'',
  school:managerInfo.schoolUid,
  page:1,
  pageSize:10,
})
//Table data
interface TableItem {
  uuid: string;
  className: string;
  classMajor: string;
  classSchool: string;
  classDepartment: string;
  classDepartmentUid: string;
  classMajorUid: string;
  classCreateMan: string;
  classStatus: number;
  classIcon: string;
  classDesc: string;
  CreateTime:string
}
//query get data
const tableData = ref<TableItem[]>([]);
const handleSearch = ()=>{
  if (queryForm.clazzName != '' || queryForm.uuid != '') {
    classList(queryForm).then(response => {
      tableData.value = response.data.data
    })
  }
}
//添加班级成员
const addPerson = ()=>{
  router.push("/StudentCreate")
}

//添加班级课程
const addCourse= ()=>{

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
  width: 120px;
  height: 30px;
  display: inline;
  margin-top: 20px;
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
