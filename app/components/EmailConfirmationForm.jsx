"use client";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ReportIcon from "@mui/icons-material/Report";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { requestResetPassword } from "../lib/auth_api";
import { getAlertByHttpCode } from "../lib/common_utils";
import AppAlert from "./AppAlert";

const EmailConfirmationForm = () => {
  const [alert, setAlert] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert({});

    let responseCode;
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const response = await requestResetPassword(formData.get("email"));

      responseCode = response.responseCode;
      setAlert(getAlertByHttpCode(responseCode));
      setShowAlert(true);
    } catch (error) {
      setAlert(getAlertByHttpCode(responseCode));
      setIsLoading(false);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="xs">
      <>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: 9999,
            position: "absolute",
            minHeight: "100vh",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppAlert
          title={alert.title}
          color={alert.color}
          message={alert.message}
          show={showAlert}
          handleClose={() => setShowAlert(false)}
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
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
              type="email"
              name="email"
              error={!!alert.email}
              helperText={alert.email ? alert.email : ""}
              autoFocus
              autoComplete="on"
              inputProps={{ autoComplete: "on" }}
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
              Send Email
            </Button>
          </Box>
        </Box>
      </>
    </Container>
  );
};

export default EmailConfirmationForm;
