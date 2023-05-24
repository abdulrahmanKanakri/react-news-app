import React, { useEffect, useState } from "react";
import * as z from "zod";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Form } from "@/components/Form";
import { useAuth } from "@/providers/auth";

import { useRegister } from "../hooks/useRegister";
import { AppNotification } from "@/providers/notification";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("Name is required")
      .max(32, "Name must be less than 100 characters"),
    lastName: z
      .string()
      .nonempty("Name is required")
      .max(32, "Name must be less than 100 characters"),
    email: z.string().nonempty("Email is required").email("Email is invalid"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one upper letter, one lower letter and one special character"
      ),
    passwordConfirm: z.string().nonempty("Please confirm your password"),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }
  );

interface RegisterFormProps {
  onSuccess: () => void;
}

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { register, isSuccess, isLoading } = useRegister();
  const { refreshUser } = useAuth();

  const handleSubmit = async (values: RegisterFormValues) => {
    const response = await register({
      name: [values.firstName, values.lastName].join(" "),
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirm,
    });

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
          Sign up
        </Typography>
        <Form<RegisterFormValues, typeof registerSchema>
          onSubmit={handleSubmit}
          schema={registerSchema}
          sx={{ mt: 2 }}
        >
          {({ register, formState: { errors } }) => (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message ?? ""}
                    {...register("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message ?? ""}
                    {...register("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message ?? ""}
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel
                      htmlFor="password"
                      error={!!errors.passwordConfirm}
                      required
                    >
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="passwordConfirm"
                      label="Confirm Password"
                      type={showPasswordConfirmation ? "text" : "password"}
                      fullWidth
                      required
                      error={!!errors.passwordConfirm}
                      {...register("passwordConfirm")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setShowPasswordConfirmation((show) => !show);
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPasswordConfirmation ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.passwordConfirm && (
                      <FormHelperText error>
                        {errors.passwordConfirm?.message ?? ""}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                loading={isLoading}
              >
                Sign up
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
