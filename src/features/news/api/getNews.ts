import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { ApiEndpoints } from "@/constants/api-endpoints";

import { NewsItem } from "../types";
import { omitEmptyValues } from "@/utils";

interface GetNewsParams {
  keyword?: string;
  category?: string;
  source?: string;
}

export interface GetNewsResponse extends BaseResponse {
  data: NewsItem[];
}

export const getNews = async (
  params?: GetNewsParams
): Promise<GetNewsResponse> => {
  return await axios.get(ApiEndpoints.news, {
    params: omitEmptyValues(params),
  });
};
