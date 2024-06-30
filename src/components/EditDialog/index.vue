<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { updateData, addData, getClassifyById } from "@/api/list";
import CircularJSON from "circular-json";

defineOptions({
  name: "EditDialog"
});
const props = defineProps({
  dialogFormVisible: Boolean,
  row: Object,
  title: String,
  isAdd: Boolean
});
// 定义emits，以便子组件可以触发事件给父组件
const emit = defineEmits(["update:dialogFormVisible", "update-success"]);
// 如果需要响应式地跟踪props的变化，可以使用ref
const Visible = ref(props.dialogFormVisible);
const editTitle = ref(props.title);
// const form = ref({});
// 监听props的变化，并更新响应式引用
watch(
  () => props.dialogFormVisible,
  newVal => {
    Visible.value = newVal;
  }
);

// 监听title的变化，并更新响应式引用
watch(
  () => props.title,
  newVal => {
    editTitle.value = newVal;
  }
);
// 定义关闭对话框的方法
const closeDialog = () => {
  Visible.value = false; // 首先更新子组件的状态
  emit("update:dialogFormVisible", false); // 然后通过事件通知父组件
};
//更新数据
const confirmDialog = async () => {
  if (!props.row.id && props.isAdd) {
    console.error("No ID provided for update");
    return;
  }
  try {
    // 调用API接口更新数据
    const result = await updateData(props.row.id, props.row);
    if (result && result.status === 200) {
      // 更新成功的逻辑
      console.log("Update successful", result);
      closeDialog(); // 关闭对话框
      emit("update-success");
    } else {
      // 处理非200状态码的情况
      console.error(
        "Update failed with status:",
        result.status,
        "data:",
        result.data
      );
    }
  } catch (error) {
    // 捕获并处理错误
    console.log("错误信息", error);
  }
};
// 定义增加数据的方法
const addDialog = async () => {
  try {
    // 调用API接口增加数据
    const result = await addData(props.row);
    if (result && result.status === 200) {
      // 增加成功的逻辑
      console.log("Add successful", result);
      closeDialog(); // 关闭对话框
      emit("update-success");
    } else {
      // 处理非200状态码的情况
      console.error(
        "Add failed with status:",
        result.status,
        "data:",
        result.data
      );
    }
  } catch (error) {
    // 捕获并处理错误
    console.error("Error during add", error);
  }
};

//获取标签名
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
const classifyList = ref([
  { id: 1, classifyname: "标签1" },
  { id: 2, classifyname: "标签2" },
  { id: 3, classifyname: "标签3" },
  { id: 4, classifyname: "标签4" }
]);
</script>
<template>
  <div class="dialog">
    <el-dialog
      v-model="Visible"
      :title="editTitle"
      width="500"
      :show-close="false"
    >
      <el-form :v-model="props.row">
        <el-form-item label="标题" label-width="130px">
          <el-input v-model="props.row.title" />
        </el-form-item>
        <el-form-item label="用户名" label-width="130px" :disabled="true">
          <el-input v-model="props.row.username" />
        </el-form-item>
        <el-form-item label="内容" label-width="130px">
          <el-input v-model="props.row.scontent" />
        </el-form-item>
        <el-form-item label="图片地址" label-width="130px">
          <el-input v-model="props.row.contentimg" />
        </el-form-item>
        <el-form-item label="分类" label-width="130px">
          <el-select
            v-model="props.row.classify"
            :placeholder="getClassifyName(props.row.classify)"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in classifyList"
              :key="item.id"
              :label="item.classifyname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <!-- 更新点击事件，以便触发closeDialog方法 -->
          <el-button @click="closeDialog">取消</el-button>
          <!-- 更新点击事件，以便触发confirmDialog方法 -->
          <!-- 如果是增加数据，显示增加按钮 -->
          <el-button v-if="isAdd" @click="addDialog">增加</el-button>
          <!-- 如果是更新数据，显示更新按钮 -->
          <el-button v-else @click="confirmDialog">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
