<script setup lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { getUserList } from "@/api/user";
import EditDialog from "@/components/EditDialog/index.vue";

defineComponent({
  name: "userList"
});
const total = ref();
let userList: any = ref([]);
const loadData = async () => {
  userList.value = await getUserList();
  total.value = userList.value.length;
  console.log(userList.value);
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
  return userList.value.filter(
    (item: any, index: number) =>
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};
//对话框
const title = ref();
const usersForm = ref([]);
const dialogFormVisible = ref(false);
const isAdd = ref(false);
const isUpdateSuccess = ref(false);
const openEditDialog = row => {
  if (row.id == null) {
    title.value = "增加内容";
    isAdd.value = true;
  } else {
    title.value = "修改内容";
    isAdd.value = false;
  }

  dialogFormVisible.value = true;
  usersForm.value = { ...row };
};
onMounted(async () => {
  await loadData();
});
</script>

<template>
  <div class="main">
    <div class="table">
      <el-row>
        <el-col :span="24">
          <el-table :data="UseTableData()" style="width: 100%">
            <el-table-column type="index" width="100" label="#" />
            <el-table-column prop="username" label="用户" width="250" />
            <el-table-column prop="endate" label="注册时间" width="250" />
            <el-table-column prop="roles" label="权限" width="200">
              <template #default="scope">
                <el-tag
                  :type="scope.row.roles === 'admin' ? 'primary' : 'success'"
                >
                  {{ scope.row.roles }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right" label="操作" width="180">
              <template #default="scope">
                <el-button size="small" @click="openEditDialog(scope.row)">
                  修改
                </el-button>
                <!--                <el-button-->
                <!--                  size="small"-->
                <!--                  type="danger"-->
                <!--                  @click="listDelete(scope.row)"-->
                <!--                >-->
                <!--                  删除-->
                <!--                </el-button>-->
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
<!--      <EditDialog-->
<!--        :row="usersForm"-->
<!--        :title="title"-->
<!--        :is-add="isAdd"-->
<!--        :dialogFormVisible="dialogFormVisible"-->
<!--        @update:dialogFormVisible="dialogFormVisible = $event"-->
<!--        @update-success="isUpdateSuccess = true"-->
<!--      />-->
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
</style>
