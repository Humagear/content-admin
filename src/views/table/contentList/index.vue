<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watchEffect } from "vue";
import { useStoreList } from "@/store/modules/list";
import { deleteList, getClassifyById, updateData } from "@/api/list";
import { ElMessage, ElMessageBox } from "element-plus";
import EditDialog from "@/components/EditDialog/index.vue";
import { useEditDialogStore } from "@/store/modules/EditDialog";
import { Edit } from "@element-plus/icons-vue";
defineOptions({
  name: "contentList"
});
const getContent = useStoreList();
let tableList: any = ref([]);
const total = ref();
const loadData = async () => {
  await getContent.getStoreList();
  tableList.value = getContent.contentList;
  total.value = tableList.value.length;
};
onMounted(async () => {
  await loadData();
});

//分类
const getClassifyName = id => {
  switch (id) {
    case 1:
      return "标签1";
    case 2:
      return "标签2";
    case 3:
      return "标签3";
    case 4:
      return "标签4";
  }
};

// 在父组件 contentList 中定义 reloadData 函数
const reloadData = async () => {
  tableList.value = [];
  await loadData();
  try {
    await loadData(); // 假设 loadData 是从 API 获取数据的异步函数
    // 更新分页到第一页或其他逻辑
    state.page = 1;
  } catch (error) {
    // 处理错误，例如显示错误消息
    ElMessage.error("数据加载失败");
  } finally {
  }
};
const isUpdateSuccess = ref(false);
watchEffect(() => {
  if (isUpdateSuccess.value) {
    reloadData();
    isUpdateSuccess.value = false; // 重置状态
  }
});
// 调用 API 删除项的方法
const confirmDelete = async id => {
  try {
    await deleteList(id);
    // 从界面上移除已删除项
    tableList.value = tableList.value.filter(item => item.id !== id);
    ElMessage.success("删除成功");
    await loadData();
  } catch (error) {
    ElMessage.error("删除取消");
  }
};
const listDelete = row => {
  const id = row.id; // 假设每行数据都有一个 id 属性
  ElMessageBox.confirm("是否要删除该项", "警告", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning"
  })
    .then(async () => {
      await confirmDelete(id);
    })
    .catch(() => {
      ElMessage.info("删除取消");
    });
};

//分页
const state = reactive({
  page: 1,
  limit: 10,
  total: total
});
//改变页码
const handleCurrentChange = (e: number) => {
  state.page = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  state.limit = e;
};
//前端限制分页（tableData为当前展示页表格）
const UseTableData = () => {
  return tableList.value.filter(
    (item: any, index: number) =>
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};

//对话框
const title = ref();
const contentForm = ref([]);
const dialogFormVisible = ref(false);
const isAdd = ref(false);
const openEditDialog = row => {
  if (row.id == null) {
    title.value = "增加内容";
    isAdd.value = true;
  } else {
    title.value = "修改内容";
    isAdd.value = false;
  }

  dialogFormVisible.value = true;
  contentForm.value = { ...row };
};
</script>

<template>
  <div class="main">
    <div class="add">
      <el-button type="primary" :icon="Edit" circle @click="openEditDialog" />
    </div>
    <div class="table">
      <el-row>
        <el-col :span="24">
          <el-table :data="UseTableData()" style="width: 100%">
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="username" label="用户" width="180" />
            <el-table-column prop="contentimg" label="图片地址" width="180">
              <template #default="scope">
                <div class="cell-content">{{ scope.row.contentimg }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="scontent" label="具体内容" width="380">
              <template #default="scope">
                <div class="cell-content">{{ scope.row.scontent }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="look" label="浏览量" width="180" />
            <el-table-column prop="classify" label="分类">
              <template #default="scope">
                <el-tag type="primary">{{
                  getClassifyName(scope.row.classify)
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right" label="操作" width="180">
              <template #default="scope">
                <el-button size="small" @click="openEditDialog(scope.row)">
                  修改
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="listDelete(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="page">
      <el-pagination
        ackground
        layout="prev, pager, next ,total, sizes"
        :total="state.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div class="edit">
      <EditDialog
        :row="contentForm"
        :title="title"
        :is-add="isAdd"
        :dialogFormVisible="dialogFormVisible"
        @update:dialogFormVisible="dialogFormVisible = $event"
        @update-success="isUpdateSuccess = true"
      />
    </div>
  </div>
</template>

<style lang="scss">
.cell-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/*解决ie11下el-table出现空白问题*/
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
/*解决ie11下el-table出现空白问题 end*/
</style>
