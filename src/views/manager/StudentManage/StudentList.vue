<template>
  <div>
    <div class="container" v-loading="loading">
      <div class="handle-box" >
        <el-input v-model="query.name" placeholder="学生口令" class="handle-input mr10" ></el-input>
        <el-select v-model="query.address" placeholder="专业" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-select v-model="query.address" placeholder="班级" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-button type="primary" :icon="Search" @click="handleSearch" class="search-button">搜索</el-button>
        <el-button type="primary" :icon="Plus" class="search-button" @click="addStudent">新增</el-button>
        <el-button type="primary" @click="exportXlsx" class="search-button">导出Excel</el-button>
        <!--批量导入-->
          <el-upload
              ref="uploadInstance"
              :action="url.stuImport"
              :limit="1"
              :auto-upload="true"
              accept=".xlsx, .xls"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="handleAvatarSuccess"
              :headers="myHeader"
              name="file"
          >
            <el-button class="mr10 search-button "  type="success" >批量导入</el-button>
          </el-upload>
          <el-link href="/studentTemplate.xlsx" target="_blank" class="search-button">
            <el-button class="mr10 search-button "  type="success"> 下载模板</el-button>
          </el-link>


      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="uuid" label="口令" width="220" align="center"></el-table-column>
        <el-table-column prop="sudentName" label="学生名"></el-table-column>
        <el-table-column label="学生专业">
          <template #default="scope">{{ scope.row.sudentMajor }}</template>
        </el-table-column>
        <el-table-column prop="sudentClass" label="班级"></el-table-column>
        <el-table-column prop="sudentPhone" label="手机号"></el-table-column>
        <el-table-column prop="sudentMail" label="邮箱"></el-table-column>
        <el-table-column label="头像" align="center">
          <template #default="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.sudentIcon"
                :z-index="10"
                :preview-src-list="[scope.row.sudentIcon]"
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

        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
              编辑
            </el-button>
            <el-button text :icon="Edit" @click="showDetail()" v-permiss="15">
              详情
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
import {ElMessage, ElMessageBox, UploadInstance, UploadProps} from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../../../api';
import * as XLSX from "xlsx";
import router from "../../../router";
import {manager} from "../../../store/manager";
import {importStuList} from "../../../api/Manager/StudentManageApi";

const uploadInstance = ref<UploadInstance>()
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
const managerInfo = manager()
interface TableItem {
  uuid: number;
  sudentName: string;
  sudentSchoolNumber:string,
  sudentClass: string ;
  sudentMajor: string;
  sudentPhone: string;
  sudentMail:string,
  sudentCollege:string,
  sudentDepartment:string,
  sudentIcon:string,
  sudentSex:string,
  createTime:string,
  updateTime:string
}
const url = reactive({
  stuImport:"/api/manager/importStuList"
})
const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
//icon upload request header
const myHeader = reactive({
  token:managerInfo.token
})
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

};
//批量导入--start
const importList = ref<any>([]);
const fileRaw = ref()
const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  fileRaw.value = rawFile
  importList.value = await analysisExcel(rawFile);
  loading.value = true
  return true;
};
const analysisExcel = (file: any) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const data = e.target.result;
      let datajson = XLSX.read(data, {
        type: 'binary',
      });

      const sheetName = datajson.SheetNames[0];
      const result = XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]);
      resolve(result);
    };
    reader.readAsBinaryString(file);
  });
};
//批量导入--end
//学生详情
const showDetail = ()=>{
  router.push("/StudentDetail")
}
//导出--start
const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];
const exportXlsx = () => {
  tableData.value.map((item: any, i: number) => {
    const arr: any[] = [i + 1];
    arr.push(...[item.name, item.sno, item.class, item.age, item.sex]);
    list.push(arr);
  });
  let WorkSheet = XLSX.utils.aoa_to_sheet(list);
  let new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
  XLSX.writeFile(new_workbook, `表格.xlsx`);
};
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  loading.value = false
    setTimeout(() => {
      // 把数据传给服务器后获取最新列表，这里只是示例，不做请求
      const list = importList.value.map((item: any, index: number) => {
        return {
          sudentName: item['姓名'],
          sudentSchoolNumber: item['学号'],
          sudentClass: item['班级'],
          sudentMajor: item['专业'],
          sudentDepartment: item['学院'],
          sudentPhone: item['手机号'],
          sudentMail: item['邮箱'],
          sudentSex: item['性别'],
        };
      });
      tableData.value.push(...list);
      ElMessage.success("导入成功")
    }, 1500)
}
//导出--end
const addStudent = ()=>{
  router.push("/StudentCreate")
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  display: flex;
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
