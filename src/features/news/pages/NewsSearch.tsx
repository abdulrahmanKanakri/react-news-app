import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

import { NewsList } from "../components/NewsList";
import { NewsFilters } from "../components/NewsFilters";
import { useCategories, useFetchNews, useSources } from "../hooks";

export const NewsSearch: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const location = useLocation();

  const { categories } = useCategories();
  const { sources } = useSources();
  const { news, isLoading } = useFetchNews({
    keyword: location.state.q,
    category: selectedCategory,
    source: selectedSource,
  });

  return (
    <>
      <Box>
        <NewsFilters
          categories={categories}
          sources={sources}
          selectedCategory={selectedCategory}
          selectedSource={selectedSource}
          onCategoryChange={setSelectedCategory}
          onSourceChange={setSelectedSource}
        />
        <NewsList news={news} loading={isLoading} />
      </Box>
    </>
  );
};
