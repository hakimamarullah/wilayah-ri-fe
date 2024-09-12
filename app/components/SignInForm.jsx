"use client";
import { HomeOutlined } from "@mui/icons-material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ReportIcon from "@mui/icons-material/Report";
import { Backdrop, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
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
  const router = useRouter();

  const redirectToHomepage = () => {
    router.push("/");
  };

  if (session) redirectToHomepage();

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
        redirectToHomepage();
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

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ overflow: "hidden", mb: "100vh" }}
    >
      {session ? null : (
        <>
          {" "}
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
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password : ""}
                autoComplete="current-password"
                inputProps={{ autoComplete: "off" }}
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
