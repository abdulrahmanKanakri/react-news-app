import React from "react";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  objectFit: "cover",
  borderRadius: 16,
});

type ImageProps = {
  fallbackText?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Image: React.FC<ImageProps> = ({
  fallbackText = "Thumbnail",
  ...props
}) => {
  return (
    <Img
      {...props}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "https://placehold.co/600x400?text=" + fallbackText;
      }}
    />
  );
};
