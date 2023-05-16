import { axios } from "@/lib/axios";
import { BaseResponse } from "@/types";

import { NewsItem } from "../types";

export interface GetNewsResponse extends BaseResponse {
  data: NewsItem[];
}

export const getNews = async (): Promise<GetNewsResponse> => {
  return await axios.get("/news");
};
