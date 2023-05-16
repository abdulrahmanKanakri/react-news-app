import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { ApiEndpoints } from "@/constants/api-endpoints";

import { Source } from "../types";

export interface GetSourcesResponse extends BaseResponse {
  data: {
    sources: Source[];
  };
}

export const getSources = async (): Promise<GetSourcesResponse> => {
  return await axios.get(ApiEndpoints.sources);
};
