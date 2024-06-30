<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useStoreList } from "@/store/modules/list";
import { deleteList } from "@/api/list";

defineOptions({
  name: "test"
});

</script>

<template>
  <div class="main">
    <span>测试页面</span>
  </div>
</template>

<style lang="scss">

</style>
