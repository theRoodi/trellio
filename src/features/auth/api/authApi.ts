import { LoginDataType } from "features/auth/ui/Login/Login";
import { instance } from "common/api";
import { AxiosResponse } from "axios";
import { UserType } from "features/auth/api/authApi.types";
import { BaseResponseType } from "types/responce.types";
export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      any
    >("auth/login", data);
  },
  me() {
    return instance.get<BaseResponseType<UserType>>("auth/me");
  },
  logout() {
    return instance.delete<BaseResponseType>("auth/login");
  },
};
