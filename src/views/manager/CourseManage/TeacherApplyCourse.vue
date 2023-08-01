<template>
  <div class="container">
    <el-container>
<!--      <el-header class="exam-header">-->
<!--       -->
<!--      </el-header>-->
      <el-main>
        <div class="exam-record">
          <div class="exam-record-sort">
            <div>
              <span><el-icon><TrophyBase /></el-icon>审批结果：</span>
              <el-button  type="primary" class="el-tag">通过</el-button>
              <el-button  type="warning" class="el-tag">不通过</el-button>
            </div>
            <div style="margin: 15px 0 15px 0;">
              <span><el-icon><StarFilled /></el-icon>审批状态：</span>
              <el-button  type="danger" class="el-tag">审批中</el-button>
              <el-button  type="warning" class="el-tag">退回</el-button>
              <el-button  type="primary" class="el-tag">审批结束</el-button>
            </div>
            <div >
              <span><el-icon><Notebook /></el-icon>抄送：</span>
              <el-button  type="primary" class="el-tag">抄送给我的</el-button>
            </div>
          </div>
          <el-card  v-for="(o,index) in 8" :key="index" class="exam">
            <el-row gutter="20">
              <el-col :span="4">
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
              </el-col>
              <el-col :span="4">
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
              </el-col>
              <el-col :span="4">
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
              </el-col>
              <el-col :span="4">
              </el-col>
              <el-col :span="4">
              </el-col>
              <el-col :span="4">

                <el-button type="primary" @click="showExam()" target="_blank"
                           v-loading.fullscreen.lock="fullscreenLoading">查看审批详情</el-button>
              </el-col>
            </el-row>
          </el-card>
          <div class="exam-record-pagination">
            <el-pagination
                large
                background
                layout="prev, pager, next"
                :total="50"
                class="pagination"
            />
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="StudyVedioCenter">

import {reactive, ref} from "vue";
import { Notebook, StarFilled, TrophyBase} from "@element-plus/icons-vue";
import router from "../../../router";

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
const query = reactive({
  courseName:'',
  department:''
})
//loading加载
const fullscreenLoading = ref(false)
const exam = reactive({
  //考试难度等级
  examTrap:'',
  //考试评分,一共五分的等级，每个星星代表一分的等级
  scoreCommance:''

})

const showExam = () =>{
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
    router.push("TeacherApplyCourseDetail")
  }, 1500)
}

</script>

<style >
.container{
  width: 100%;
  background-color: #FFFFFF;
  box-sizing: border-box;
}
.exam-record{
  width: 80%;
  box-sizing: border-box;
  margin: 0px 10% 0px 10%;
  padding: 30px;
}
.exam-record-pagination{
  text-align: center;
  font-size: 40px;
  height: 40px;
  margin-left: 40%;
  margin-top: 40px;
}
.el-pagination {
  --el-pagination-font-size: 20px;
  --el-button-width: 30px;
  --el-button-height: 30px;
}
.exam-header{
  padding: 0;
  height: 71px;
  align-content: center;
}
/deep/ .el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper {
  height: 58px;
  font-size: 18px;
}
.exam{
  width: 95%;
  height: 200px;
  margin: 20px;
  padding: 20px;
  margin-top: 20px;
}
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.exam-record-sort{
  width: 100%;
  height: 120px;
}
.exam-record-sort{
  text-align: left;
  font-size: 20px;
  padding: 0px 50px 0 50px;
}
.sort-button{
  height: 30px;
  margin-left: 20px;
  font-size: 20px;
}
.el-tag{
  height: 30px;
  margin-left: 20px;
  font-size: 20px;
  background-color: snow;
  color: #1a1a1a;
  border: none;
}
.exam-record-sort span{
  font-family: "Segoe UI";
  color: black;
}
</style>
