import { useMutation } from "react-query";

import { logout } from "../api/logout";
import storage from "@/utils/storage";

export const useLogout = () => {
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation(logout);

  const handleLogout = () => {
    return mutateAsync(undefined, {
      onSuccess: (response) => {
        console.log(response.message);
        storage.clearToken();
      },
    });
  };

  return {
    logout: handleLogout,
    isError,
    isLoading,
    isSuccess,
  };
};
