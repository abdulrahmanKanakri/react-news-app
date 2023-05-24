import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

export type UpdatePreferedSourcesDTO = {
  sources_ids: number[];
};

export const updatePreferedSources = (
  data: UpdatePreferedSourcesDTO
): Promise<BaseResponse> => {
  return axios.put(ApiEndpoints.updatePreferedSources, data);
};
