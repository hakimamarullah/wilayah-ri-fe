"use client";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportIcon from "@mui/icons-material/Report";
import { Backdrop, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";
import { signUp } from "../lib/auth_api";
import AppAlert from "./AppAlert";
import PasswordField from "./PasswordField";

export default function SignUpForm({ session }) {
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);
  const router = useRouter();

  if (session) router.replace("/");


  const isPasswordMatch = (password, confirmPassword) =>  password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const data = new FormData(event.currentTarget);
    data.set("roleIds", JSON.stringify([2]));

    try {
      if (!isPasswordMatch(data.get("password"), data.get("confirm_password"))) {
        setErrors({ password: 'Password does not match' });
        return;
      }
      setIsLoading(true);
      const { responseCode, responseData } = await signUp(data);

      switch (responseCode) {
        case 400:
          setErrors(responseData);
          break;
        case 409:
          setErrors({
            email: "email or phone already taken",
          });
          break;
        case 200:
          setIsLoading(false);
          setIsSuccess(true);
          redirectToSignInPage();
          break;
        default:
          setUnexpectedError(true);
          break;
      }
    } catch (error) {
      console.log({ fuck: error?.response?.data });
      setUnexpectedError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToSignInPage = () => {
    let timer = setTimeout(() => router.push("/auth/signin"), 2000);
    return () => clearTimeout(timer);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ overflow: "hidden" }}>
      {session ? null : (
        <>
          {" "}
          <Backdrop
            sx={{ color: "#fff", zIndex: 9999, position: "absolute", minHeight: "100vh" }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <AppAlert
            title={"Success Register"}
            color="success"
            message="Registration successful. Please log in!"
            show={isSuccess}
            handleClose={() => setIsSuccess(false)}
            icon={<CheckCircleIcon />}
          />
          <AppAlert
            title={"Application Error"}
            color="danger"
            message="Something went wrong. Please try again later!"
            show={error}
            handleClose={() => setUnexpectedError(false)}
            icon={<ReportIcon />}
          />
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#b79347" }}>
              <AppRegistrationOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email : ""}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Mobile Phone"
                name="phone"
                autoComplete="phone"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone : ""}
                autoFocus
              />
              <PasswordField
                id="password"
                name="password"
                label="Password"
                error={!!errors.password}
                helperText={errors.password ? errors.password : ""}
              />

              <PasswordField
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                error={!!errors.password}
                helperText={errors.password ? errors.password : ""}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#b79347",
                  ":hover": { bgcolor: "#a67c37" },
                }}
              >
                Sign Up
              </Button>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item alignItems="center">
                  <Link href="/auth/signin" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}
