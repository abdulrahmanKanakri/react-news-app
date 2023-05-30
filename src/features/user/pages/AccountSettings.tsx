import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

import { useAuth } from "@/providers/auth";

import { SettingsForm } from "../components/SettingsForm";

const PlaceHolderSkeleton = (
  <Grid container spacing={2}>
    <Grid item sm={6} width="100%">
      <Skeleton height={50} />
    </Grid>
    <Grid item sm={6} width="100%">
      <Skeleton height={50} />
    </Grid>
    <Grid item xs={12} width="100%">
      <Skeleton height={50} />
    </Grid>
    <Grid item xs={12} width="100%">
      <Skeleton height={50} />
    </Grid>
    <Grid item xs={12} width="100%">
      <Skeleton height={50} />
    </Grid>
  </Grid>
);

export const AccountSettings: React.FC = () => {
  const { user, refreshUser } = useAuth();

  const userInfo = useMemo(() => {
    if (!user) return undefined;

    const [firstName, lastName] = user.name.split(" ");
    return {
      firstName,
      lastName,
      email: user.email,
    };
  }, [user]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 4 }}>
        <Typography variant="h4" fontWeight={500}>
          Account settings
        </Typography>
        <Paper elevation={6} sx={{ p: 8 }}>
          {userInfo ? (
            <SettingsForm
              user={userInfo}
              onSuccess={() => {
                refreshUser();
              }}
            />
          ) : (
            PlaceHolderSkeleton
          )}
        </Paper>
      </Box>
    </>
  );
};
