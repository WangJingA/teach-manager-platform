<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班级所属学院" prop="region">
          <el-select v-model="form.region" placeholder="请选择" class="select-input">
            <el-option key="小明" label="小明" value="小明"></el-option>
            <el-option key="小红" label="小红" value="小红"></el-option>
            <el-option key="小白" label="小白" value="小白"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="班级所属专业" prop="region">
            <el-select v-model="form.region" placeholder="请选择" class="select-input">
              <el-option key="小明" label="小明" value="小明"></el-option>
              <el-option key="小红" label="小红" value="小红"></el-option>
              <el-option key="小白" label="小白" value="小白"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="班级图标">
          <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
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

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
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
  name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};
const formRef = ref<FormInstance>();
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: true,
  type: ['小明'],
  resource: '小红',
  desc: '',
  options: [],
});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(form);
      ElMessage.success('提交成功！');
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
    title:'请开始课程创建',
    message:'please start create course',
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
