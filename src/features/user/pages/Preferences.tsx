import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { CategoriesForm, SourcesForm } from "../components";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
}));

export const Preferences: React.FC = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <Item>
            <SourcesForm />
          </Item>
        </Grid>
        <Grid item sm={6}>
          <Item>
            <CategoriesForm />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
