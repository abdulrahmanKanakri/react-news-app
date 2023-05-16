import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { NewsItem } from "../types";
import { NewsItemComponent } from "./NewsItemComponent";

interface MainFeaturedNewsItemProps {
  newsItem?: NewsItem;
}

const PlaceHolderSkeleton = (
  <Grid container spacing={[8, 2]}>
    <Grid item sm={6} width={"100%"}>
      <Skeleton variant="rectangular" height={300} />
    </Grid>
    <Grid item sm={6} width={"100%"} alignSelf={"center"}>
      <Box>
        <Skeleton height={40} width="60%" />
        <Skeleton height={100} width="90%" />
        <Skeleton height={100} />
        <Skeleton width="40%" />
      </Box>
    </Grid>
  </Grid>
);

export const MainFeaturedNewsItem: React.FC<MainFeaturedNewsItemProps> = ({
  newsItem,
}) => {
  return (
    <>
      {newsItem ? (
        <NewsItemComponent newsItem={newsItem} size="large" />
      ) : (
        PlaceHolderSkeleton
      )}
    </>
  );
};
