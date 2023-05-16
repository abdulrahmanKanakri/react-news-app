import { useQuery } from "react-query";

import { getSources } from "../api";

export const useSources = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["sources"],
    queryFn: () => getSources(),
  });

  return { sources: data?.data?.sources ?? [], isLoading, isSuccess };
};
