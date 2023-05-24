import { useQuery } from "react-query";
import { getUser } from "../api/getUser";

export const useUser = (enabled?: boolean) => {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled,
  });

  return {
    user: data?.data.user,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
};
