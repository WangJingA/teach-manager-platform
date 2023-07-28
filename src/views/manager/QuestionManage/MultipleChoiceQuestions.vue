<template>
  <div class="container">
    <div class="radio-question">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="140px">
        <el-form-item label="课程" prop="name">
          <el-select v-model="question.courseName" placeholder="课程" class="select-input">
            <el-option key="小明" label="小明" value="小明"></el-option>
            <el-option key="小红" label="小红" value="小红"></el-option>
            <el-option key="小白" label="小白" value="小白"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题干" prop="name">
          <el-input v-model="question.question"></el-input>
        </el-form-item>
        <!-- 题目选项-->
        <el-form-item label="选项" prop="name">
          <div class="question-option-wrapper">
            <div v-for="(option,index) in question.option" :key="index" style="margin-top: 30px">
              <span class="option-pre">{{option.optionPre}}:</span>
              <el-input class="option-input" v-model="option.option"></el-input>
              <el-button class="option-button" type="danger" @click="delOption(index)">删除</el-button>
            </div>
          </div>
        </el-form-item>
        <!-- 标准答案-->
        <el-form-item label="标答" prop="desc">
          <div class="mb-2 flex items-center text-sm">
            <el-checkbox-group
                v-model="checked"
                @change="handleCheckedChange"
            >
              <el-checkbox v-for="(option,index) in optionList.option" :key="index" :label="option" >{{
                  option
                }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="分数" prop="desc">
          <el-input
              v-model="question.score"
              placeholder="分数"
              class="question-score-input"
          >
            <template #prepend>
              <el-button @click="subScore">-</el-button>
            </template>
            <template #append>
              <el-button @click="addScore">+</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="难度" prop="desc">
          <el-rate
              v-model="question.rate"
              show-score
              text-color="#ff9900"
              score-template="{value} points"
          />
        </el-form-item>
        <el-form-item label="答案解析" prop="desc">
          <el-input type="textarea" rows="5" v-model="question.answerAnalysis"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)" class="radio-button">表单提交</el-button>
          <el-button type="warning" @click="onReset(formRef)" class="radio-button">重置表单</el-button>
          <el-button type="primary" @click="addOption()" class="radio-button">添加选项</el-button>
          <el-button type="primary" @click="preview(formRef)" class="radio-button">预览</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ElMessage, ElNotification, FormInstance, FormRules} from "element-plus";
import {reactive, ref} from "vue";

//表单规则
const rules: FormRules = {
  name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};
//多选框
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
//单选题属性
const question = reactive({
  question:'',
  courseName:'',
  answer:'',
  score:0,
  rate:0,
  answerAnalysis:'',
  option:[
    {
      optionPre:'A',
      option:''
    },
    {
      optionPre:'B',
      option:''
    },
    {
      optionPre:'C',
      option:''
    },
    {
      optionPre:'D',
      option:''
    }
  ]
})
//增加选项
const addOption = ()=>{
  let optionArr = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
  ]
  var len = question.option.length
  if (len >= optionArr.length){
    ElMessage({
      type:"warning",
      message:'选项超出最大限度'
    })
    return
  }
  let option = {
    optionPre: optionArr[len],
    option:''
  }
  question.option.push(option)
  optionList.option.push(optionArr[len])
  // //@ts-ignore
  // checked.value.push(optionArr[len])
}
//删除选项
const delOption = (index:number) =>{
  question.option.splice(index)
  optionList.option.splice(index)
}
ElNotification({
  title:'开始创编单选题',
  type:'success',
  message:'start radio question create'
})
//增加分数
const addScore = () =>{
  question.score = question.score + 1.5
}
//减少分数
const subScore = () =>{
  if (question.score > 1.5) {
    question.score = question.score - 1.5
  }
}
const preview = (formEl: FormInstance | undefined)=>{

}
//多选框函数全部选择
const checkAll = ref(false)
//多选框函数
const isIndeterminate = ref(false)
//多选框选择数据数组
const checked = ref([])
//多选框选项
const optionList = reactive({
  option:['A','B','C','D']
})

const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === optionList.option.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < optionList.option.length
}

</script>

<style scoped>
.radio-question{
  font-size: 20px;
}
/deep/ .el-form-item{
  --el-form-label-font-size: 20px;
}
/deep/ .el-input__wrapper{
  height: 40px;
  width: 500px;
}
.option-pre{
  font-weight: bold;
  font-size: 20px;
}
.question-option-wrapper{
//margin-left: 40px;
  margin-top: 30px;
}
.option-button{
  height: 40px;
  width: 120px;
  margin-left: 20px;
}
.option-input{
  display: inline;
  margin-left: 20px;
}
.question-score-input{
  width: 300px;
}
/deep/.el-radio.el-radio--large .el-radio__inner {
  width: 20px;
  height: 20px;
}
/deep/.el-icon svg {
  height: 1.5em;
  width: 1.5em;
}
.radio-button{
  margin-top: 30px;
  width: 200px;
  height: 40px;
}
.check-option{
  margin-left: 20px;
}
/deep/.el-checkbox__inner{
  width: 20px;
  height: 20px;
}
/deep/.el-checkbox__label{
  font-size: 18px;
}
</style>
