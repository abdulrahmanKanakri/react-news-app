import { useMutation } from "react-query";

import { UpdateUserCredentialsDTO, updateUser } from "../api/updateUser";

export const useUpdateUser = () => {
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation(
    (data: UpdateUserCredentialsDTO) => updateUser(data)
  );

  const handleUpdateUser = (data: UpdateUserCredentialsDTO) => {
    return mutateAsync(data);
  };

  return {
    updateUser: handleUpdateUser,
    isError,
    isLoading,
    isSuccess,
  };
};
