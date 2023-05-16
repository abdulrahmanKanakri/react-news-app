import React, { useState } from "react";
import * as z from "zod";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Form } from "@/components/Form";
import { User } from "@/types";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { AppNotification } from "@/providers/notification";

const schema = z
  .object({
    firstName: z
      .string()
      .nonempty("Name is required")
      .max(32, "Name must be less than 100 characters"),
    lastName: z
      .string()
      .nonempty("Name is required")
      .max(32, "Name must be less than 100 characters"),
    password: z
      .string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one upper letter, one lower letter and one special character"
      )
      .optional()
      .or(z.literal("")),
    passwordConfirm: z.string().optional().or(z.literal("")),
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

interface FormValues {
  firstName: string;
  lastName: string;
  password?: string;
  passwordConfirm?: string;
}

interface SettingsFormProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onSuccess: (user: User) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  user,
  onSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { updateUser, isLoading } = useUpdateUser();

  const handleSubmit = async (values: FormValues) => {
    const response = await updateUser({
      name: [values.firstName, values.lastName].join(" "),
      password: values.password,
      password_confirmation: values.passwordConfirm,
    });

    onSuccess(response.data.user);

    AppNotification.success(response.message);
  };

  return (
    <>
      <Form<FormValues, typeof schema> onSubmit={handleSubmit} schema={schema}>
        {({ register, formState: { errors } }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  required
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
                  disabled
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="password" error={!!errors.password}>
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
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
                  >
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    id="passwordConfirm"
                    label="Confirm New Password"
                    type={showPasswordConfirmation ? "text" : "password"}
                    fullWidth
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
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isLoading}
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </>
        )}
      </Form>
    </>
  );
};
