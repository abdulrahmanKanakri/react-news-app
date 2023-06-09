import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse, User } from "@/types";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export interface LoginResponse extends BaseResponse {
  data: {
    user: User;
    token: string;
  };
}

export const login = (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  return axios.post(ApiEndpoints.login, data);
};
