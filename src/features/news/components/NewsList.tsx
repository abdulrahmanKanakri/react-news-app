import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import { NewsItem } from "../types";
import { NewsItemComponent } from "./NewsItemComponent";
import { NoData } from "@/components/Layout/NoData";

interface NewsListProps {
  news: NewsItem[];
  loading?: boolean;
}

const PlaceholderSkeleton = (
  <Box>
    <Skeleton variant="rectangular" height={160} />
    <Box sx={{ pt: 0.5 }}>
      <Skeleton />
      <Skeleton width="60%" />
    </Box>
  </Box>
);

export const NewsList: React.FC<NewsListProps> = ({ news, loading }) => {
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {loading ? (
            new Array(4).fill(0).map((_, i) => (
              <Grid item sm={6} md={3} key={i} width="100%">
                {PlaceholderSkeleton}
              </Grid>
            ))
          ) : news.length > 0 ? (
            news.map((item, i) => (
              <Grid item sm={6} md={3} key={i}>
                <NewsItemComponent newsItem={item} />
              </Grid>
            ))
          ) : (
            <>
              <NoData />
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};
