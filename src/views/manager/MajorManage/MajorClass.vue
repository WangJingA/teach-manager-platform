<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="专业口令" class="handle-input mr10"></el-input>
        <el-select v-model="query.address" placeholder="学院" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-select v-model="query.address" placeholder="专业" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
        <el-button type="primary" :icon="Plus" class="search-button" @click="addClass">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="班级口令" width="220" align="center"></el-table-column>
        <el-table-column prop="name" label="学校"></el-table-column>
        <el-table-column label="专业">
          <template #default="scope">￥{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column prop="address" label="班级名"></el-table-column>
        <el-table-column label="班级图标" align="center">
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
            <el-button text :icon="Edit" @click="showDetail(scope.$index, scope.row)" v-permiss="15">
              详情
            </el-button>
            <el-button text :icon="Edit"  @click="handleDeatil(scope.$index)" v-permiss="16">
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
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../../../api';
import router from "../../../router";

interface TableItem {
  id: number;
  name: string;
  money: string;
  state: string;
  date: string;
  address: string;
}

const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
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

// 删除操作
const handleDeatil = (index: number) => {
    router.push("/TeacherClassDetail")
};
//查看班级详情
const showDetail = (index: number,row:any) => {
  router.push("/ClassDetail")
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
//添加班级
const addClass = () =>{
  router.push("/ClassCreate")
}
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
</style>
