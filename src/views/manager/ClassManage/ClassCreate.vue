<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="班级名称" prop="clazzName">
          <el-input v-model="form.clazzName"></el-input>
        </el-form-item>
        <el-form-item label="班级所属学院" prop="region">
          <el-select v-model="form.did" placeholder="请选择" class="select-input">
            <el-option :key="index"
                       :label="dep.departmentName"
                       :value="dep.uuid"
                       v-for="(dep,index) in departmentInfo"
                       @click="selectDep(dep.uuid,dep.departmentName)"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="班级所属专业" prop="region">
            <el-select v-model="form.mid" placeholder="请选择" class="select-input">
              <el-option key=""
                         :label="major.majorName"
                         :value="major.uuid"
                         v-for="major in majorInfo"
                         @click="selectMajor(major.majorName)"
              ></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="班级图标">
          <el-upload
              class="avatar-uploader"
              :action="iconUrl.url"
              :auto-upload="true"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="myHeader"
              :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程描述" prop="desc">
          <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
          <el-button @click="onReset(formRef)">重置表单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="baseform">
import {onMounted, reactive, ref} from 'vue';
import {ElMessage, ElNotification, FormInstance, FormRules} from 'element-plus';
import type { UploadProps } from 'element-plus'
import {majorList} from "../../../api/Manager/PublicApi";
import {distinctDep} from "../../../api/Manager/PublicApi";
import {manager} from "../../../store/manager";
import {classCreate} from "../../../api/Manager/ClassManageApi";

//icon upload url
const iconUrl = reactive({
  url:"api/passUse/uploadIcon"
})

//upload icon ref
const upload = ref()

//major scroll info
const majorInfo = ref([])

//department scroll info
const departmentInfo = ref([])

//manager information
const managerInfo = manager()

//icon upload request header
const myHeader = reactive({
  token:managerInfo.token
})

//create class icon url
const imageUrl = ref('')

//select dep get id
const depId = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  form.icon = response.data
  alert(form.icon)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be image format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}
const rules: FormRules = {
  clazzName: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
  mid: [{ required: true, message: '请选择学校', trigger: 'blur' }],
  did: [{ required: true, message: '请选择学院', trigger: 'blur' }],
};
//form ref
const formRef = ref<FormInstance>();

//create class form
const form = reactive({
  clazzName: '',
  major: '',
  mid:'',
  did:'',
  department: '',
  icon:'',
  school:'',
  desc:''
});

// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(form);
      classCreate(form).then(response=>{
        ElMessage.success(response.data.data);
      })
    } else {
      return false;
    }
  });
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//select department to choice major
const selectDep = (dep:string,depName:string)=>{
  if (dep === ""){
    ElMessage.warning({
      message:'请选择学院'
    })
  }else {
    depId.value = dep
    form.department = depName
    //major scroll request
    majorList(depId.value).then(response=>{
      majorInfo.value = response.data.data
    })
  }
}

//select major
const selectMajor = (majorName:string)=>{
  form.major = majorName
}


onMounted(()=>{
  ElNotification({
    title:'请开始课程创建',
    message:'please start create course',
    type:'success'
  })
  //@ts-ignore
  form.school = managerInfo.schoolUid
    //department scroll request
    distinctDep(managerInfo.schoolUid).then(response=>{
      departmentInfo.value = response.data.data
    })
})
</script>
<style scoped>
.upload-demo{
  width: 600px;
}
.select-input{
  width: 600px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.el-form-item{
  --el-form-label-font-size: 18px;
}
</style>
