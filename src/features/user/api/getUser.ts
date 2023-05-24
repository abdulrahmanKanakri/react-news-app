import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse, User } from "@/types";

export interface GetUserResponse extends BaseResponse {
  data: {
    user: User;
  };
}

export const getUser = async (): Promise<GetUserResponse> => {
  return await axios.get(ApiEndpoints.getUser);
};
