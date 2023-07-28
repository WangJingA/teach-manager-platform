<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.uuid" placeholder="学院口令" class="handle-input mr10"></el-input>
        <el-select v-model="query.departmentName" placeholder="学院名" class="handle-select mr10" @change="listSelect()">
          <el-option key="1" :label="department.departmentName" :value="department.departmentName"  v-for="department in listDepartmentName"></el-option>
        </el-select>
        <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
        <el-button type="primary" :icon="Plus" class="search-button" @click="addDepartment">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column label="学院口令" width="220" align="center" >
          <template #default="scope">
            <span @click="copy(scope.row.uuid)">
            {{ scope.row.uuid }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="学院"></el-table-column>
        <el-table-column label="所属学校">
          <template #default="scope">{{ scope.row.schoolUid }}</template>
        </el-table-column>
        <el-table-column label="学院图标" align="center">
          <template #default="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.departmentIcon"
                :z-index="10"
                :preview-src-list="[scope.row.departmentIcon]"
                preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
<!--        <el-table-column label="状态" align="center">-->
<!--          <template #default="scope">-->
<!--            <el-tag-->
<!--                :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''"-->
<!--            >-->
<!--              {{ scope.row.state }}-->
<!--            </el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->

        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Edit"  @click="handleDeatil(scope.$index,scope.row)">
              查看详情
            </el-button>
            <el-button text :icon="Edit"  @click="handleEdit(scope.$index,scope.row)">
              编辑
            </el-button>
            <el-button text :icon="Edit" class="red"  @click="handleDelete(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.page"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
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
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import router from "../../../router";
import {listDepartment} from "../../../api/Manager/DepartmentManageApi";
import {distinctDep} from "../../../api/Manager/PublicApi";
import {manager} from "../../../store/manager";

const managerInfo = manager()
interface TableItem {
  id: number;
  name: string;
  money: string;
  state: string;
  date: string;
  address: string;
}
interface departmentItem{
  uuid:string,
  departmentName:string
}

const listDepartmentName = ref<departmentItem[]>([])

const query = reactive({
  uuid: '',
  departmentName: '',
  page: 1,
  pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  listDepartment(query).then(res => {
    tableData.value = res.data.data.teachDepartment;
    pageTotal.value = res.data.data.total || 0;
  });
};
getData();

// 查询操作
const handleSearch = () => {
  query.page = 1;
  getData();
};
// 分页导航
const handlePageChange = (val: number) => {
  query.page = val;
  getData();
};

// 查看详情操作
const handleDeatil = (index: number,row:any) => {
    router.push({
      name:'DepartmentDetail',
      params:{
        uuid:row.uuid,
        departmentName:row.departmentName,
        createMan:localStorage.getItem("ms_username"),
        credit:'管理员',
        createTime:row.createTime
      }
    })
};
const handleDelete = (index:number)=>{

}
// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  name: '',
  address: ''
});
//编辑学院信息
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.name = row.name;
  form.address = row.address;
  editVisible.value = true;
};
//保存编辑
const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第 ${idx + 1} 行成功`);
  tableData.value[idx].name = form.name;
  tableData.value[idx].address = form.address;
};
//增加学院
const addDepartment = ()=>{
  router.push("/DepartmentCreate")
}
//下拉列表获取表格数据
const listSelect =()=>{
 getData()
}
//点击复制
const copy = (context:string)=>{
  navigator.clipboard.writeText(context)
  ElMessage({
    message:'复制成功',
    type:'success'
  })
}

onMounted(()=>{
  query.departmentName = ""
  distinctDep(managerInfo.schoolUid).then(response=>{
    listDepartmentName.value = response.data.data
  })
  getData()
  ElNotification({
    title:'get department data success',
    message:'获取数据成功',
    type:'success'
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
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
