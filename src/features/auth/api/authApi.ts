import { LoginDataType } from "features/auth/ui/Login/Login";
import { instance } from "common/api";
import { AxiosResponse } from "axios";
import { ResponseType } from "features/TodolistsList/api/todolists-api";
import { UserType } from "features/auth/api/authApi.types";
export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, any>(
      "auth/login",
      data,
    );
  },
  me() {
    return instance.get<ResponseType<UserType>>("auth/me");
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
