import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { Category, Source } from "../types";

interface NewsFiltersProps {
  categories: Category[];
  sources: Source[];
  selectedCategory: string;
  selectedSource: string;
  onCategoryChange: (v: string) => void;
  onSourceChange: (v: string) => void;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  categories,
  sources,
  selectedCategory,
  selectedSource,
  onCategoryChange,
  onSourceChange,
}) => {
  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: { lg: "space-between", xs: "center" },
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            color="inherit"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onCategoryChange(category.name);
            }}
            className={
              selectedCategory === category.name ? "selected-category" : ""
            }
            sx={{
              "&.selected-category": {
                backgroundColor: "#ddd",
              },
            }}
          >
            {category.name}
          </Button>
        ))}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "center", flexWrap: "wrap", mb: 2 }}
      >
        {sources.map((source) => (
          <Button
            key={source.id}
            color="inherit"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onSourceChange(source.name);
            }}
            className={selectedSource === source.name ? "selected-source" : ""}
            sx={{
              "&.selected-source": {
                backgroundColor: "#ddd",
              },
            }}
          >
            {source.name}
          </Button>
        ))}
      </Toolbar>
    </>
  );
};
