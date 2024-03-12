import { LoginDataType } from "features/auth/ui/Login/Login";
import { instance } from "common/api";
import { AxiosResponse } from "axios";
import { UserType } from "features/auth/api/authApi.types";
import { ResponseType } from "types/responce.types";
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
