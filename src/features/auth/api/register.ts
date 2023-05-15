import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

import { User } from "../types";

export type RegisterCredentialsDTO = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface RegisterResponse extends BaseResponse {
  data: {
    user: User;
    token: string;
  };
}

export const register = (
  data: RegisterCredentialsDTO
): Promise<RegisterResponse> => {
  return axios.post("/register", data);
};
