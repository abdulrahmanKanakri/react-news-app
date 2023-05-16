import React, { useState } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { MainFeaturedNewsItem } from "../components/MainFeaturedNewsItem";
import { NewsList } from "../components/NewsList";
import { getNews } from "../api/getNews";
import { NewsItem } from "../types";

export const NewsFeed: React.FC = () => {
  const [featuredNewsItem, setFeaturedNewsItem] = useState<NewsItem>();
  const [news, setNews] = useState<NewsItem[]>([]);

  useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
    onSuccess: (data) => {
      const [featured, ...rest] = data.data;
      setFeaturedNewsItem(featured);
      setNews(rest);
    },
  });

  return (
    <>
      <MainFeaturedNewsItem newsItem={featuredNewsItem} />
      <Box sx={{ marginTop: 4 }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{ textTransform: "capitalize", fontWeight: 600, mb: 2 }}
        >
          latest news
        </Typography>
        <NewsList news={news} />
      </Box>
    </>
  );
};
