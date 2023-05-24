import React, { useMemo } from "react";

import { useSources } from "@/features/news/hooks";
import { useAuth } from "@/providers/auth";
import { AppNotification } from "@/providers/notification";

import { useUpadtePreferedSources } from "../hooks/useUpadtePreferedSources";
import { CheckMultipleForm } from "./CheckMultipleForm";

export const SourcesForm: React.FC = () => {
  const { sources } = useSources();
  const { user, refreshUser } = useAuth();
  const { updatePreferedSources, isLoading } = useUpadtePreferedSources();

  const handleFormSubmit = async (ids: number[]) => {
    const response = await updatePreferedSources({ sources_ids: ids });
    AppNotification.success(response.message);
    refreshUser();
  };

  const initialValues = useMemo(() => {
    return (user?.sources ?? []).map((source) => source.id);
  }, [user]);

  return (
    <>
      <CheckMultipleForm
        items={sources}
        onSubmit={handleFormSubmit}
        loading={isLoading}
        initialValues={initialValues}
      />
    </>
  );
};
