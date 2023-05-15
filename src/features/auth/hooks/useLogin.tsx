import { useMutation } from "react-query";

import storage from "@/utils/storage";

import { LoginCredentialsDTO, login } from "../api/login";

export const useLogin = () => {
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation(
    (data: LoginCredentialsDTO) => login(data)
  );

  const handleLogin = (data: LoginCredentialsDTO) =>
    mutateAsync(data, {
      onSuccess: (response) => {
        storage.setToken(response.data.token);
      },
    });

  return {
    login: handleLogin,
    isError,
    isLoading,
    isSuccess,
  };
};
