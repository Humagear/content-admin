<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStoreList } from "@/store/modules/list";

defineComponent({
  name: "index"
});
const storeMessage = useStoreList();
const messageListInfo: any = ref([]);

const loadData = async () => {
  await storeMessage.getMessageList(); // 调用 action 来获取消息列表
  messageListInfo.value = storeMessage.messageList.data;
  console.log(messageListInfo.value);
};
onMounted(async () => {
  await loadData();
});
const listDelete = () => {
  console.log("2");
};
</script>

<template>
  <div class="message">
    <div class="table">
      <el-row>
        <el-col :span="24">
          <el-table :data="messageListInfo" style="width: 100%">
            <el-table-column prop="id" label="对应序号" width="180" />
            <el-table-column prop="senduser" label="发送者" width="180" />
            <el-table-column prop="getuser" label="作者" width="180" />
            <el-table-column prop="mailcontent" label="留言内容" width="180" />
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
