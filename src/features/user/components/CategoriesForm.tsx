import React, { useMemo } from "react";

import { useCategories } from "@/features/news/hooks";
import { useAuth } from "@/providers/auth";
import { AppNotification } from "@/providers/notification";

import { useUpadtePreferedCategories } from "../hooks/useUpadtePreferedCategories";
import { CheckMultipleForm } from "./CheckMultipleForm";

export const CategoriesForm: React.FC = () => {
  const { categories } = useCategories();
  const { user, refreshUser } = useAuth();
  const { updatePreferedCategories, isLoading } = useUpadtePreferedCategories();

  const handleFormSubmit = async (ids: number[]) => {
    const response = await updatePreferedCategories({ categories_ids: ids });
    AppNotification.success(response.message);
    refreshUser();
  };

  const initialValues = useMemo(() => {
    return (user?.categories ?? []).map((category) => category.id);
  }, [user]);

  return (
    <>
      <CheckMultipleForm
        items={categories}
        onSubmit={handleFormSubmit}
        loading={isLoading}
        initialValues={initialValues}
      />
    </>
  );
};
