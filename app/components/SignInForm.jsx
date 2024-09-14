"use client";
import { HomeOutlined } from "@mui/icons-material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ReportIcon from "@mui/icons-material/Report";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Backdrop, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";
import { doCredentialLogin } from "../actions";
import { postSignIn } from "../lib/auth_api";
import AppAlert from "./AppAlert";

export default function SignInForm({ session }) {
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setUnexpectedError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordTimer, setShowPasswordTimer] = React.useState(null);
  const router = useRouter();

  const redirectToMyPlans = () => {
    router.push("/myplans");
  };

  if (session) redirectToMyPlans();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const credential = {
        username: formData.get("username"),
        password: formData.get("password"),
      };
      const { responseCode, responseData } = await postSignIn(credential);

      if (responseCode === 200) {
        await doCredentialLogin(responseData);
        redirectToMyPlans();
      } else if (responseCode === 401) {
        setErrors({
          username: "invalid credential",
          password: "invalid credential",
        });
      } else if (responseCode === 400) {
        setErrors(responseData);
      } else {
        setUnexpectedError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setUnexpectedError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
    if (showPasswordTimer) {
      clearTimeout(showPasswordTimer);
    }
    setShowPasswordTimer(setTimeout(() => {
      setShowPassword(false);
    }, 3000)); // Auto-hide password after 3 seconds
  };

  const handleMouseDownPassword = (event) => event.preventDefault();

  React.useEffect(() => {
    return () => {
      if (showPasswordTimer) {
        clearTimeout(showPasswordTimer);
      }
    };
  }, [showPasswordTimer]);

  React.useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setUnexpectedError(false);
      }, 3000); // Close the alert after 3 seconds
    }
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ overflow: "hidden", mb: "100vh" }}
    >
      {session ? null : (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: 9999, position: "absolute" }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
            <Grid container justifyContent="flex-start">
              <Grid item>
                <IconButton onClick={() => router.push("/")}>
                  <HomeOutlined
                    fontSize="large"
                    sx={{ borderBottom: "solid 1px black" }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Avatar sx={{ m: 1, bgcolor: "#b79347" }}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
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
                id="username"
                label="Username/email"
                name="username"
                error={!!errors.username}
                helperText={errors.username ? errors.username : ""}
                autoFocus
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password : ""}
                autoComplete="current-password"
                inputProps={{ autoComplete: "off" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                Sign In
              </Button>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item alignItems="center">
                  <Link href="/auth/signup" variant="body2">
                    {"Does not have an account yet? Sign Up"}
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
