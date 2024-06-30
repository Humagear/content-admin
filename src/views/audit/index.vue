<script setup lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useStoreList } from "@/store/modules/list";
import { tableData } from "@/assets/data";
import { approveContent, disapproveContent } from "@/api/list";

defineComponent({
  name: "index"
});

let contentInfo: Ref<any> = ref([]);
const getContent = useStoreList();
const total = ref();
const loadData = async () => {
  await getContent.getStoreList();
  contentInfo.value = getContent.contentList;
  total.value = contentInfo.value.length;
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
  return contentInfo.value.filter(
    (item: any, index: number) =>
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};
//审核判断
const getStatusIcon = status => {
  switch (status) {
    case "未确认":
      return "warning";
    case "通过":
      return "success";
    case "未通过":
      return "error";
    default:
      return "info";
  }
};
const getStatusTitle = status => {
  switch (status) {
    case "未确认":
      return "未确认";
    case "通过":
      return "已通过";
    case "未通过":
      return "未通过";
    default:
      return "不确认状态";
  }
};
const getStatusInfo = status => {
  switch (status) {
    case "未确认":
      return "请根据要求，通过审核或者不予通过";
    case "通过":
      return "此内容已通过审核";
    case "未通过":
      return "此内容未通过审核，请重新提交";
    default:
      return "不确认状态";
  }
};

//确认通过
const approve = async id => {
  try {
    const result = await approveContent({ id: id });
    if (result && result.status === 200) {
      await loadData();
    }
  } catch (error) {
    console.error("Error during update", error);
  }
};
const disapprove = async id => {
  try {
    const result = await disapproveContent({ id: id });
    if (result && result.status === 200) {
      await loadData();
    }
  } catch (error) {
    console.error("Error during update", error);
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <div class="audit">
    <div class="search" />
    <div class="table">
      <el-row>
        <el-col :span="24">
          <el-table :data="UseTableData()" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <el-row>
                  <el-col :sm="12" :lg="20">
                    <el-result
                      :icon="getStatusIcon(props.row.status)"
                      :title="getStatusTitle(props.row.status)"
                      :sub-title="getStatusInfo(props.row.status)"
                    >
                      <template v-if="props.row.status === '未确认'" #extra>
                        <el-button
                          type="danger"
                          @click="disapprove(props.row.id)"
                          >未通过</el-button
                        >
                        <el-button type="primary" @click="approve(props.row.id)"
                          >通过</el-button
                        >
                      </template>
                    </el-result>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" />
            <el-table-column label="作者" prop="username" />
            <el-table-column label="状态" prop="status" />
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
