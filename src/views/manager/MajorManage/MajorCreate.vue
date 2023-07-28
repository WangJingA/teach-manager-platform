<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="专业名称" prop="majorName">
          <el-input v-model="form.majorName"></el-input>
        </el-form-item>
        <el-form-item label="专业所属学院" prop="departmentUid">
          <el-select v-model="form.departmentUid" placeholder="学院名" class="handle-select mr10">
            <el-option key="1" :label="department.departmentName" :value="department.uuid"  v-for="department in listDepartmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业图标">
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
        <el-form-item label="专业描述" >
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
import {ElMessage, ElNotification, FormInstance, FormRules, UploadInstance} from 'element-plus';
import type { UploadProps } from 'element-plus'
import {distinctDep} from "../../../api/Manager/PublicApi";
import {manager} from "../../../store/manager";
import {addMajor} from "../../../api/Manager/MajorManageApi";

const managerInfo = manager()
const imageUrl = ref('')
const uploadInstance = ref<UploadInstance>()
interface departmentItem{
  uuid:string,
  departmentName:string
}
const listDepartmentName = ref<departmentItem[]>([])

const upload = reactive({
  uploadUrl: "api/passUse/uploadIcon"
})

const myheader = reactive({
  token:managerInfo.token
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    form.majorIcon = response.data
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!'jpg/npg/JPG/NPG/jpeg/JPEG'.indexOf(rawFile.type)) {
    ElMessage.error('图片格式应为jpg/npg/JPG/NPG/jpeg/JPEG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const rules: FormRules = {
  majorName: [{ required: true, message: '请输入专业名称', trigger: 'blur' }],
  departmentUid: [{ required: true, message: '请选择学院', trigger: 'blur' }],
};

const formRef = ref<FormInstance>();

const form = reactive({
  majorName: '',
  departmentUid:'',
  majorIcon:'',
  description:''
});

// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      addMajor(form).then(response=>{
        ElMessage.success(response.data.msg);
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
  distinctDep(managerInfo.schoolUid).then(response=>{
    listDepartmentName.value = response.data.data
  })
  ElNotification({
    title:'请开始专业创建',
    message:'please start create major',
    type:'success'
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
