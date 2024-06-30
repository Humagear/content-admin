import { http } from "@/utils/http";
<<<<<<< HEAD
=======
import { baseUrlApi } from "@/api/utils";
>>>>>>> 93397a2 (commit message)

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
<<<<<<< HEAD
    /** 昵称 */
    nickname: string;
=======
>>>>>>> 93397a2 (commit message)
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
<<<<<<< HEAD
  return http.request<UserResult>("post", "/login", { data });
=======
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
>>>>>>> 93397a2 (commit message)
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
<<<<<<< HEAD
=======

export const getUserList = () => {
  return http.request<UserResult>("get", baseUrlApi("getUsersList"));
};
>>>>>>> 93397a2 (commit message)
