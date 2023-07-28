<template>
  <div class="container">
    <!-- 轮播图上传-->
    <el-card>
      <h3 class="demonstration">学生登录系统首页轮播图显示设置</h3>
      <div>
        <el-upload
            v-model:file-list="fileList"
            action=""
            ref="upload"
            auto-upload="false"
            :http-request="BSUploadFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="changeFile"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <el-image w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <el-button type="primary" size="large" class="upload-button" @click="uploadFiles">上传轮播图</el-button>
    </el-card>
    <!-- 轮播图预览-->
    <div>
      <div class="block text-center">
      <h3 class="demonstration"
      >学生首页界面轮播图预览</h3
      >
          <el-carousel class="pr-image" height="400px">
            <el-carousel-item v-for="item in fileList" :key="item">
              <el-image  :src="item.url"/>
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage, ElNotification, UploadInstance, UploadProps, UploadUserFile} from "element-plus";
import {delImage, listImages, schoolImages} from "../../../api/Manager/SchoolManageApi";
import {manager} from "../../../store/manager";

const managerInfo = manager()

const upload = ref<UploadInstance>()
//轮播图数据---start
const fileList = ref<UploadUserFile[]>([

])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  delImage(managerInfo.schoolUid,uploadFile.url).then(response=>{
    if (response.data.code === '00000'){
      ElMessage({
        message:'删除成功',
        type:"success"
      })
    }
  })
  console.log(uploadFile, uploadFiles)
}
let filesList = new Array()
const changeFile: UploadProps['onChange']=(uploadFile, uploadFiles)=>{
  filesList = uploadFiles
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const BSUploadFile = ()=>{
  var files = new FormData();
  filesList.forEach(file=>{
    console.log(file.raw)
    files.append("files",file.raw)
  })
  var schoolUid = managerInfo.schoolUid;
  schoolImages(schoolUid,files).then(response=>{
    if (response.data.code === '00000'){
      ElMessage({
        message:'上传成功',
        type:'success'
      })
    }
    console.log(response)
  })
}

const uploadFiles = ()=>{
  upload.value?.submit
  ElMessage({
    message:'上传中',
    type:'success'
  })
}
onMounted(()=>{
    listImages(managerInfo.schoolUid).then(response=>{
        if (response.data.code === '00000'){
          for (var i=0;i<response.data.data.length;i++){
            fileList.value.push(response.data.data[i])
          }
          ElNotification({
            title:'load images success',
            message:'加载学校轮播图成功',
            type:"success"
          })
        }
    })
})
//轮播图数据---end
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
.upload-button{
  width: 120px;
  height: 30px;
  margin-top: 20px;
}
.demonstration {
  color: var(--el-text-color-secondary);
  font-size: 18px;
  margin: 30px 0px 30px 0px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
.el-carousel{
  width: 800px;
  left: 30%;
}

.pr-image{
  width: 800px;
  height: 400px;
}
</style>
