<template>
	<div
      class="login-wrap"
      v-loading="loading"
      element-loading-text="登录中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
  >
		<div class="ms-login">
			<div class="ms-title">管理员后台管理系统</div>
			<el-form
          :model="param"
          :rules="rules"
          ref="login"
          label-width="0px"
          class="ms-content" >
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						placeholder="password"
						v-model="param.password"
						@keyup.enter="submitForm(login)"
					>
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
        <el-form-item prop="checkCode">
          <el-input
              placeholder="验证码"
              v-model="param.checkCode"
              @keyup.enter="submitForm(login)"
              style="width: 50%"
          >
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
          <img :src="checkCodeParam.url" style="width: 40%;height: 30px;margin-left: 10px;" @click="changeCaptcha">
        </el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
				<p class="login-tips">Tips : 用户名和密码随便填。</p>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import {loginCallBack, managerLogin} from "../api";
import {manager} from "../store/manager";

/**
 * loading 加载
 */
const loading = ref(false)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`

const managerToken = manager()
interface LoginInfo {
	username: string;
	password: string;
  checkCode:string;
}
const checkCodeParam = reactive({
  checkCode:'',
  url:'/api/captcha/managerCaptcha/date='+new Date()
})
const router = useRouter();
const param = reactive<LoginInfo>({
	username: 'admin4',
	password: '5KT0Hb8b',
  checkCode:''
});
//点击更改验证码
const changeCaptcha = ()=>{
  checkCodeParam.url = '/api/captcha/managerCaptcha/date='+new Date()
}
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  checkCode:[{required:true,message:'请输入验证码',trigger:'blur'}]
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid: boolean) => {
    loading.value = true
		if (valid) {
			localStorage.setItem('ms_username', param.username);
			const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'teacher'];
			permiss.handleSet(keys);
			localStorage.setItem('ms_keys', JSON.stringify(keys));

      managerLogin(param).then(response=>{
          if (response.data.code === '00000'){
            ElMessage.success({
              message:response.data.msg
            })
            //登录成功回调获取学校信息
            loginCallBack(response.data.data.user.userModel.uuid).then(resp=>{
              if (resp.data.code === "00000"){
                loading.value = false
                localStorage.setItem("managerUuid",response.data.data.user.userModel.schoolManagerUid)
                localStorage.setItem("schoolUid",resp.data.data.schoolUid)
                managerToken.setSchoolUid(resp.data.data.schoolUid)
                managerToken.setToken(response.data.data.token)
                router.push('/');
              }
            })
          }else {
            loading.value = false
            ElMessage.warning({
              message:"登录信息出错，请仔细查看登录信息"
            })
          }
      })
		} else {
      loading.value = false
			ElMessage.error('信息不正确');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/login-bg.jpg);
	background-size: 100%;
}
.checkCode{
  width: 50%;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 45%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}
.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
