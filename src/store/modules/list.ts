import { defineStore } from "pinia";
<<<<<<< HEAD
import { Names } from "@/store/store-name";
import { getContentList } from "@/api/list";

export const useStoreList = defineStore(Names.TEST, {
  state: () => ({
    list: {}
  }),
  getters: {},
  actions: {
    async getList() {
      this.list = await getContentList();
      console.log(this.list);
=======
import { getContentList, getMessage } from "@/api/list";

export const useStoreList = defineStore("content-list", {
  state: () => ({
    contentList: {},
    messageList: {}
  }),
  getters: {},
  actions: {
    async getStoreList() {
      this.contentList = await getContentList();
    },
    async getMessageList() {
      this.messageList = await getMessage();
>>>>>>> 93397a2 (commit message)
    }
  }
});
