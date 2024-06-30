<script setup lang="ts">
<<<<<<< HEAD
import { ref, onMounted } from "vue";
import { useStoreList } from "@/store/modules/list";

defineOptions({
  name: "Welcome"
});
const useList = useStoreList();
const tableList: any = ref([]);
onMounted(async () => {
  await useList.getList();
  tableList.value = useList.list;
=======
import { ref, onMounted, reactive } from "vue";
import {getContentList, getTodayLook, getTodayUp} from "@/api/list";
import { useNav } from "@/layout/hooks/useNav";
defineOptions({
  name: "Welcome"
});
//获取个人用户信息
const { username, userAvatar } = useNav();
//获取今日的日期
const today = new Date();
const year = today.getFullYear(); // 获取当前年份
const month = String(today.getMonth() + 1).padStart(2, "0"); // 获取当前月份，月份从0开始计数，所以需要+1
const day = String(today.getDate()).padStart(2, "0"); // 获取当前日期
const formattedDate = `${year}-${month}-${day}`; // 格式化为 YYYY-MM-DD 格式// 输出今日日期，例如 "2024-05-28"
//获取内容列表
const todayUp: any = ref();
//今日浏览
const todayLook: any = ref();
onMounted(() => {
  getTodayUp().then(res => {
    todayUp.value = res.count;
  });
  getTodayLook().then(res => {
    todayLook.value = res.totalVisits;
    console.log(todayLook.value);
  });
>>>>>>> 93397a2 (commit message)
});
</script>

<template>
  <div class="main">
<<<<<<< HEAD
    <span>{{ tableList }}</span>
  </div>
</template>
=======
    <el-row>
      <el-col :span="8">
        <el-card style="max-width: 500px; height: 200px" shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 23px">今日上传</span>
            </div>
          </template>
          <div class="date" style="font-size: 25px">
            {{ formattedDate }}
          </div>
          <div class="number">
            <h3>{{ todayUp }}</h3>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="max-width: 500px; height: 200px" shadow="hover">
          <template #header>
            <div class="card-header">
              <span style="font-size: 23px">今日浏览</span>
            </div>
          </template>
          <div class="date" style="font-size: 25px">
            {{ formattedDate }}
          </div>
          <div class="number">
            <h3>{{ todayLook }}</h3>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="max-width: 500px; height: 200px" shadow="hover">
          <template #header>
            <div
              class="user-content"
              style="display: flex; justify-content: space-between"
            >
              <el-avatar :size="50" :src="userAvatar" />
              <div class="username" style="font-size: 40px">
                {{ username }}
              </div>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  //background-color: #7a80b4;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
>>>>>>> 93397a2 (commit message)
