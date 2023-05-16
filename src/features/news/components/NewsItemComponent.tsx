import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { NewsItem } from "../types";
import { formatDate } from "../utils";
import { Image } from "@/components/Image/Image";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface NewsItemComponentProps {
  newsItem: NewsItem;
  size?: "small" | "large";
}

export const NewsItemComponent: React.FC<NewsItemComponentProps> = ({
  newsItem,
  size = "small",
}) => {
  return (
    <>
      <Box component={"a"} href={newsItem.url} target="_blank">
        <Grid container spacing={size === "large" ? [2, 8] : 2}>
          <Grid item sm={size === "large" ? 6 : false} width={"100%"}>
            <Image
              src={newsItem.thumbnail}
              alt="featured-post"
              height={size === "large" ? 300 : 220}
              fallbackText={newsItem.source}
            />
          </Grid>
          <Grid
            item
            sm={size === "large" ? 6 : false}
            container
            direction={"column"}
            alignSelf={"center"}
            rowGap={1}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                columnGap: "4px",
                fontSize: size === "large" ? 14 : 12,
              }}
            >
              <Avatar sx={{ width: 24, height: 24, fontSize: "inherit" }}>
                {newsItem.source.charAt(0)}
              </Avatar>
              <Typography sx={{ fontSize: "inherit" }} color="text.secondary">
                {newsItem.source}
              </Typography>
              {bull}
              <Typography sx={{ fontSize: "inherit" }} color="text.secondary">
                {formatDate(newsItem.publishedAt)}
              </Typography>
            </Box>
            <Typography
              component="h1"
              sx={{ color: "black" }}
              {...(size === "large"
                ? { typography: { md: "h3", sm: "h4", xs: "h5" } }
                : { variant: "h6", lineHeight: 1.2 })}
            >
              {newsItem.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={size === "large" ? 14 : 12}
            >
              {newsItem.description}
            </Typography>
            <Typography
              sx={{ fontSize: size === "large" ? 14 : 12, color: "#d74047" }}
            >
              {newsItem.category}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
