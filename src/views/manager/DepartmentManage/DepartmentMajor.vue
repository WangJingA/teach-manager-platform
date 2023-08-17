<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.uuid" placeholder="学院口令" class="handle-input mr10" ></el-input>
        <el-select v-model="query.departmentName" placeholder="学院名" class="handle-select mr10" @change="listSelect()">
          <el-option key="1" :label="department.departmentName" :value="department.departmentName"  v-for="department in listDepartmentName"></el-option>
        </el-select>
        <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
        <el-button type="primary" :icon="Plus" class="search-button" @click="addMajor">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="专业口令" width="220" align="center"></el-table-column>
        <el-table-column prop="name" label="专业名"></el-table-column>
        <el-table-column label="专业所属学院">
          <template #default="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column label="专业图标" align="center">
          <template #default="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.thumb"
                :z-index="10"
                :preview-src-list="[scope.row.thumb]"
                preview-teleported
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
                :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''"
            >
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
              编辑
            </el-button>
            <el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
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
import { ref, reactive,onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../../../api';
import router from "../../../router";
import {listDepartment} from "../../../api/Manager/DepartmentManageApi";

/**
 * 学院下拉列表数据
 */
interface departmentIttem{
  uuid:string,
  departmentName:string
}

const listDepartmentName = ref<departmentIttem[]>([])
interface TableItem {
  id: number;
  name: string;
  money: string;
  state: string;
  date: string;
  address: string;
}

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
  fetchData().then(res => {
    tableData.value = res.data.list;
    pageTotal.value = res.data.pageTotal || 50;
  });
};
getData();
//下拉列表获取表格数据
const listSelect = ()=>{
  getData()
}
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

// 删除操作
const handleDelete = (index: number) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        ElMessage.success('删除成功');
        tableData.value.splice(index, 1);
      })
      .catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  name: '',
  address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.name = row.name;
  form.address = row.address;
  editVisible.value = true;
};
const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第 ${idx + 1} 行成功`);
  tableData.value[idx].name = form.name;
  tableData.value[idx].address = form.address;
};
//增加专业跳转
const addMajor = () =>{
  router.push("/MajorCreate")
}
//初始化加载
onMounted(()=>{
  query.departmentName = ""
  listDepartment(query).then(reponse=>{
    listDepartmentName.value = reponse.data.data.teachDepartment
  })
})
</script>

<style scoped>
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
  width: 300px;
}
.search-button{
  height: 40px;
  width: 160px;
}
</style>
