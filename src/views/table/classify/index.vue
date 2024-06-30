<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getClassify } from "@/api/list";
import EditDialog from "@/components/EditDialog/index.vue";
const classifyInfo: any = ref([]);
defineComponent({
  name: "index"
});
const listDelete = () => {
  console.log("2");
};
onMounted(async () => {
  const result = await getClassify();
  classifyInfo.value = result;
});
</script>

<template>
  <div class="classify">
    <div class="table">
      <el-row>
        <el-col :span="24">
          <el-table :data="classifyInfo" style="width: 100%">
            <el-table-column prop="id" label="对应序号" width="180" />
            <el-table-column prop="classifyname" label="标签名称" width="180" />
            <el-table-column align="right" label="操作" width="180">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="listDelete()"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
