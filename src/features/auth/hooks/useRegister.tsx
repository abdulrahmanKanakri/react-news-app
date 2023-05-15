import { useMutation } from "react-query";

import { RegisterCredentialsDTO, register } from "../api/register";
import storage from "@/utils/storage";

export const useRegister = () => {
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation(
    (data: RegisterCredentialsDTO) => register(data)
  );

  const handleRegister = (data: RegisterCredentialsDTO) => {
    return mutateAsync(data, {
      onSuccess: (response) => {
        storage.setToken(response.data.token);
      },
    });
  };

  return {
    register: handleRegister,
    isError,
    isLoading,
    isSuccess,
  };
};
