import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse, User } from "@/types";

export type UpdateUserCredentialsDTO = {
  name: string;
  password?: string;
  password_confirmation?: string;
};

export interface UpdateUserResponse extends BaseResponse {
  data: {
    user: User;
  };
}

export const updateUser = (
  data: UpdateUserCredentialsDTO
): Promise<UpdateUserResponse> => {
  return axios.put(ApiEndpoints.updateUser, data);
};
