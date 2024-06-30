export default {
  path: "/table",
  meta: {
    title: "列表"
  },
  children: [
    {
      path: "/table/contentList",
      name: "contentList",
      component: () => import("@/views/table/contentList/index.vue"),
      meta: {
        title: "内容列表"
      }
    },
    {
      path: "/table/userList",
      name: "userList",
      component: () => import("@/views/table/usersList/index.vue"),
      meta: {
        title: "用户列表"
      }
    },
    {
      path: "/table/audit",
      name: "audit",
      component: () => import("@/views/audit/index.vue"),
      meta: {
        title: "审核"
      }
    },
    {
      path: "/table/classify",
      name: "classify",
      component: () => import("@/views/table/classify/index.vue"),
      meta: {
        title: "标签设定"
      }
    },
    {
      path: "/table/message",
      name: "message",
      component: () => import("@/views/table/message/index.vue"),
      meta: {
        title: "留言列表"
      }
    }
  ]
};
