import { useMutation } from "react-query";
import {
  UpdatePreferedCategoriesDTO,
  updatePreferedCategories,
} from "../api/updatePreferedCategories";

export const useUpadtePreferedCategories = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    (data: UpdatePreferedCategoriesDTO) => updatePreferedCategories(data)
  );

  const handleUpdatePreferedCategories = (
    data: UpdatePreferedCategoriesDTO
  ) => {
    return mutateAsync(data);
  };

  return {
    updatePreferedCategories: handleUpdatePreferedCategories,
    isLoading,
    isSuccess,
  };
};
