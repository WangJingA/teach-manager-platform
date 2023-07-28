<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="学院名" prop="departmentName">
          <el-input v-model="form.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="学院图标">
          <el-upload
              ref="uploadInstance"
              class="avatar-uploader"
              :action="upload.uploadUrl"
              :show-file-list="true"
              :auto-upload="true"
              :limit="1"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="myheader"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="学院描述" prop="desc">
          <el-input type="textarea" rows="5" v-model="form.description"></el-input>
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
import type { UploadProps,UploadInstance } from 'element-plus'
import {createDepartment} from "../../../api/Manager/DepartmentManageApi";
import {manager} from "../../../store/manager";
import {addMajor} from "../../../api/Manager/MajorManageApi";

const managerInfo = manager()
const uploadInstance = ref<UploadInstance>()
const upload = reactive({
  uploadUrl: "api/passUse/uploadIcon"
})
const imageUrl = ref('')

const myheader = reactive({
  token:managerInfo.token
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  form.departmentIcon = response.data
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
  departmentName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};
const formRef = ref<FormInstance>();
interface formType{
  schoolUid:string,
  departmentName:string,
  departmentIcon:string,
  description:string
}
const form = reactive<formType>({
  schoolUid:'',
  departmentName:'',
  departmentIcon:'',
  description:''
});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      createDepartment(form).then(response=>{
        if (response.data.code === "00000"){
          form.schoolUid = ''
          form.departmentIcon =  ''
          imageUrl.value = ''
          form.description = ''
          ElMessage.success('提交成功！');
        }
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

onMounted(()=>{
  ElNotification({
    title:'请开始学院创建',
    message:'please start create department',
    type:'success'
  })
  var managerUid = localStorage.getItem("managerUid");
  //@ts-ignore
  form.schoolUid = managerInfo.schoolUid
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
