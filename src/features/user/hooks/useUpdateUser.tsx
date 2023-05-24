import { useMutation } from "react-query";

import { UpdateUserDTO, updateUser } from "../api/updateUser";

export const useUpdateUser = () => {
  const { mutateAsync, isError, isLoading, isSuccess } = useMutation(
    (data: UpdateUserDTO) => updateUser(data)
  );

  const handleUpdateUser = (data: UpdateUserDTO) => {
    return mutateAsync(data);
  };

  return {
    updateUser: handleUpdateUser,
    isError,
    isLoading,
    isSuccess,
  };
};
