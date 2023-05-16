import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { ApiEndpoints } from "@/constants/api-endpoints";

import { NewsItem } from "../types";

export interface GetNewsResponse extends BaseResponse {
  data: NewsItem[];
}

export const getNews = async (): Promise<GetNewsResponse> => {
  return await axios.get(ApiEndpoints.news);
};
