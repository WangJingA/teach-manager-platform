<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="region">
          <el-radio-group v-model="form.radio" placeholder="请选择" class="select-input">
            <el-radio key="小明" label="男" value="男"></el-radio>
            <el-radio key="小红" label="女" value="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="教师所属学院" prop="region">
          <div style="display: flex">
             <el-transfer v-model="value" :data="data" :titles="['学院列表','选择的学院']"/>
          </div>
        </el-form-item>
        <el-form-item label="账号" prop="name">
          <div style="display: flex">
            <el-input v-model="form.name" type="password"></el-input>
            <el-tooltip
                class="box-item"
                effect="light"
                content="随机账号由姓名的姓氏英文加'_'和名字英文组成"
                placement="top-start"
            >
              <el-icon class="tips"><Warning /></el-icon>
            </el-tooltip>
            <el-button type="primary" style="margin-left: 30px">随机账号</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <div style="display: flex">
            <el-input v-model="form.name" type="password"></el-input>
            <el-tooltip
                class="box-item"
                effect="light"
                content="密码由数字，英文字母，特殊符号组成，长度不超过16"
                placement="top-start"
            >
              <el-icon class="tips"><Warning /></el-icon>
            </el-tooltip>
            <el-button type="primary" style="margin-left: 30px">随机密码</el-button>
          </div>
        </el-form-item>


        <el-form-item label="教师描述" prop="desc">
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

//穿梭框
interface Option {
  key: number
  label: string
  disabled: boolean
}

const generateData = () => {
  const data: Option[] = []
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const data = ref<Option[]>(generateData())
const value = ref([])
//
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
  radio:'',
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
    title:'请开始添加学生',
    message:'please start create student',
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
.tips{
  width: 60px;
  height: 30px;
  align-content: center;
  --color: red;
}
.el-icon svg {
  height: 2em;
  width: 2em;
}
</style>
