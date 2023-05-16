import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { ApiEndpoints } from "@/constants/api-endpoints";

import { Category } from "../types";

export interface GetCategoriesResponse extends BaseResponse {
  data: {
    categories: Category[];
  };
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  return await axios.get(ApiEndpoints.categories);
};
