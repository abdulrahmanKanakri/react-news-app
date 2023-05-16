import { useQuery } from "react-query";

import { getNews } from "../api";

interface useFetchNewsProps {
  keyword?: string;
  category?: string;
  source?: string;
}

export const useFetchNews = ({ keyword, category, source }: useFetchNewsProps) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["newsSearch", keyword, category, source],
    queryFn: () => getNews({ keyword, category, source }),
  });

  return { news: data?.data ?? [], isLoading, isSuccess };
};
