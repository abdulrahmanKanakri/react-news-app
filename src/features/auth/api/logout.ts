import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

export const logout = (): Promise<BaseResponse> => {
  return axios.post(ApiEndpoints.logout);
};
