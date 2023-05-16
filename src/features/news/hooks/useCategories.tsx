import { useQuery } from "react-query";
import { getCategories } from "../api";

export const useCategories = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return { categories: data?.data?.categories ?? [], isLoading, isSuccess };
};
