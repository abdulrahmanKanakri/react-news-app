import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { NewsList } from "../components/NewsList";
import { getNews } from "../api/getNews";
import { NewsItem } from "../types";

export const NewsSearch: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const location = useLocation();

  useQuery({
    queryKey: ["newsSearch", location.state],
    queryFn: () => getNews({ keyword: location.state.q }),
    onSuccess: (data) => {
      setNews(data.data);
    },
  });

  return (
    <>
      <NewsList news={news} />
    </>
  );
};
