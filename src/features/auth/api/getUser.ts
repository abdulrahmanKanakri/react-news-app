import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

import { UserInfo } from "../types";

export interface GetUserResponse extends BaseResponse {
  data: {
    user: UserInfo;
  };
}

export const getUser = async (): Promise<GetUserResponse> => {
  return await axios.get("/me");
};
