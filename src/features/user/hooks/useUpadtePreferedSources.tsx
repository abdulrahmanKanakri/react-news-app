import { useMutation } from "react-query";
import {
  UpdatePreferedSourcesDTO,
  updatePreferedSources,
} from "../api/updatePreferedSources";

export const useUpadtePreferedSources = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    (data: UpdatePreferedSourcesDTO) => updatePreferedSources(data)
  );

  const handleUpdatePreferedSources = (data: UpdatePreferedSourcesDTO) => {
    return mutateAsync(data);
  };

  return {
    updatePreferedSources: handleUpdatePreferedSources,
    isLoading,
    isSuccess,
  };
};
