<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.uuid" placeholder="班级口令" class="handle-input mr10"></el-input>
        <el-select v-model="query.dep" placeholder="学院" class="handle-select mr10" @change="changeDep">
          <el-option key="1"
                     :label="dep.departmentName"
                     :value="dep.uuid"
                     v-for="dep in deplist"
                     @click="depSelect(dep.uuid,dep.departmentName)"
          ></el-option>
        </el-select>
        <el-select v-model="query.major" placeholder="专业" class="handle-select mr10" @change="changeMaj">
          <el-option key="1" :label="maj.majorName" :value="maj.uuid" v-for="maj in majlist"></el-option>
        </el-select>
        <el-input v-model="query.clazzName" placeholder="班级名" class="handle-input mr10"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
        <el-button type="primary" :icon="Plus" class="search-button" @click="addClass">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="uuid" label="班级口令" width="220" align="center"></el-table-column>
        <el-table-column prop="classSchool" label="学校"></el-table-column>
        <el-table-column label="专业">
          <template #default="scope">{{ scope.row.classMajor }}</template>
        </el-table-column>
        <el-table-column prop="className" label="班级名"></el-table-column>
        <el-table-column label="班级图标" align="center">
          <template #default="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.classIcon"
                :z-index="10"
                :preview-src-list="[scope.row.classIcon]"
                preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
                :type="scope.row.status === 0 ? 'success' : scope.row.status === 1 ? 'danger' : ''"
            >
              <span v-if="scope.row.classStatus == 0">已创建</span>
              <span v-if="scope.row.classStatus == 1">销毁</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" >
              编辑
            </el-button>
            <el-button text :icon="Edit"  @click="showDetail(scope.$index,scope.row)" >
              查看详情
            </el-button>
            <el-button text :icon="Delete" class="red"  @click="handleDeatil(scope.$index,scope.row)" >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" >
      <div class="form-box">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="180px">
          <el-form-item label="班级名称" prop="clazzName">
            <el-input v-model="form.clazzName"></el-input>
          </el-form-item>
          <el-form-item label="班级状态">
            <el-radio-group v-model="form.status">
              <el-radio  label="1">已创建</el-radio>
              <el-radio  label="2">销毁</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="班级所属学院" prop="region">
            <el-select v-model="form.depUid" placeholder="请选择" class="select-input">
              <el-option :key="index"
                         :label="dep.departmentName"
                         :value="dep.uuid"
                         v-for="(dep,index) in deplist"
                         @click="depSelect(dep.uuid,dep.departmentName)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级所属专业" prop="region">
            <el-select v-model="form.majUid" placeholder="请选择" class="select-input">
              <el-option key=""
                         :label="major.majorName"
                         :value="major.uuid"
                         v-for="major in majlist"
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
        </el-form>
      </div>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive, onMounted} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules, UploadProps} from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../../../api';
import router from "../../../router";
import {distinctDep, majorList} from "../../../api/Manager/PublicApi";
import {manager} from "../../../store/manager";
import {classList, editClass} from "../../../api/Manager/ClassManageApi";

//manager information
const managerInfo = manager()

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

const query = reactive({
  uuid:'',
  clazzName:'',
  major:'',
  dep:'',
  school:managerInfo.schoolUid,
  pageIndex: 1,
  pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = () => {
  classList(query).then(response=>{
    tableData.value = response.data.data
  })
};
getData();

// 查询操作
const handleSearch = () => {
  query.pageIndex = 1;
  getData();
};
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

// 查看详情操作
const handleDeatil = (index: number,row:any) => {

};
//查看班级详情
const showDetail = (index:number,row:any)=>{
  router.push({
    name:'ClassDetail',
    params:{
      className:row.className,
      classSchool:row.classSchool,
      classDepartment:row.classDepartment,
      classMajor:row.classMajor,
      uuid:row.uuid,
      classPersonNumber:row.classPersonNumber,
      classCreateMan:row.classCreateMan,
      classStatus:row.classStatus
    }
  })
}
//增加班级
const addClass = ()=>{
  router.push("ClassCreate")
}
// 表格编辑时弹窗和保存
const editVisible = ref(false);



let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.clazzName = row.className;
  form.desc = row.classDesc;
  form.uuid = row.uuid
  form.majName = row.majorName
  form.depName = row.departmentName
  //@ts-ignore
  form.school = managerInfo.schoolUid
  editVisible.value = true;
};
const saveEdit = () => {
  editClass(form).then(response=>{
    if (response.data.code === "00000"){
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      tableData.value[idx].classIcon = iconUrl.url
      tableData.value[idx].classDepartment = form.depName
      tableData.value[idx].classMajor = form.majName
      tableData.value[idx].classStatus = form.status
      tableData.value[idx].classDesc = form.desc
    }
  })
};
//专业下拉列表数据
const majlist = ref([])
//学院下拉列表数据
const deplist = ref([])
    //学院选择
const depSelect = (uuid:string,depName:string)=>{
  form.depName = depName
  majorList(uuid).then(response=>{
    majlist.value = response.data.data
  })
}


//icon upload url
const iconUrl = reactive({
  url:"api/passUse/uploadIcon"
})

//upload icon ref
const upload = ref()


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
  uuid:'',
  clazzName: '',
  majName: '',
  majUid:'',
  depUid:'',
  depName: '',
  icon:'',
  school:'',
  desc:'',
  status:0
});

// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(form);
      editClass(form).then(response=>{
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

//select department to get data
const changeDep = ()=>{
  getData()
}

//select major to get data
const changeMaj = ()=>{
  getData()
}

//select major
const selectMajor = (majorName:string)=>{
  form.majName = majorName
}

onMounted(()=>{

  distinctDep(managerInfo.schoolUid).then(response=>{
    deplist.value = response.data.data
  })
})
</script>

<style scoped>
.container{
  height: 90%;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 200px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #F56C6C;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
/deep/ .el-table{
  width: 100%;
  font-size: 18px;
}
/deep/ .el-input__wrapper{
  height: 40px;
}
.search-button{
  height: 40px;
  width: 160px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
