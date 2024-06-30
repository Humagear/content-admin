import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

type Result = {
<<<<<<< HEAD
  success: boolean;
  data: Array<any>;
};

export const getContentList = () => {
  return http
    .request<Result>("get", baseUrlApi("getList"))
    .then(result => result);
=======
  status: number;
  count: any;
  success: boolean;
  data: Array<any>;
  id: number;
};

export const getContentList = () => {
  return http.request<Result>("get", baseUrlApi("getList"));
};

export const getTodayUp = () => {
  return http.request<Result>("get", baseUrlApi("today"));
};

export const deleteList = id => {
  return http.request<Result>("delete", baseUrlApi(`delete/${id}`));
};

export const addData = data => {
  return http.request<Result>("post", baseUrlApi("add"), { data: data });
};
export const updateData = (id, data) => {
  return http.request<Result>("put", `${baseUrlApi(`update/${id}`)}`, {
    data: data // 确保这里是请求体
  });
};

export const getTodayLook = () => {
  return http.request<Result>("get", baseUrlApi("todayLook"));
};

export const approveContent = id => {
  return http.request<Result>("post", baseUrlApi("approve"), { data: id });
};
export const disapproveContent = id => {
  return http.request<Result>("post", baseUrlApi("disapprove"), { data: id });
};

export const getClassify = () => {
  return http.request<Result>("get", baseUrlApi("getClassify"));
};

export const getMessage = () => {
  return http.request<Result>("get", baseUrlApi("/getAllMails"));
};

export const getClassifyById = id => {
  return http.request<Result>("get", baseUrlApi(`/getClassifyById/${id}`));
>>>>>>> 93397a2 (commit message)
};
