import React, { useEffect, useState } from "react";
import * as z from "zod";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Form } from "@/components/Form";
import { useAuth } from "@/providers/auth";

import { useLogin } from "../hooks/useLogin";
import { AppNotification } from "@/providers/notification";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isSuccess, isLoading } = useLogin();
  const { refreshUser } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await login({ ...values });
    AppNotification.success(response.message);
    refreshUser();
  };

  useEffect(() => {
    isSuccess && onSuccess();
  }, [isSuccess, onSuccess]);

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form<LoginFormValues, typeof loginSchema>
          onSubmit={handleSubmit}
          schema={loginSchema}
        >
          {({ register, formState: { errors } }) => (
            <>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                disabled={isLoading}
                required
                error={!!errors["email"]}
                helperText={errors.email?.message ?? ""}
                {...register("email")}
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel
                  htmlFor="password"
                  error={!!errors.password}
                  required
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  autoComplete="new-password"
                  required
                  error={!!errors.password}
                  {...register("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((show) => !show);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText error>
                    {errors.password?.message ?? ""}
                  </FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                loading={isLoading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Form>
      </Box>
    </>
  );
};
