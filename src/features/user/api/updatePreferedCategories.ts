import { ApiEndpoints } from "@/constants/api-endpoints";
import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

export type UpdatePreferedCategoriesDTO = {
  categories_ids: number[];
};

export const updatePreferedCategories = (
  data: UpdatePreferedCategoriesDTO
): Promise<BaseResponse> => {
  return axios.put(ApiEndpoints.updatePreferedCategories, data);
};
