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
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { sendResetPassword } from "../lib/auth_api";
import { getAlertByHttpCode } from "../lib/common_utils";
import AppAlert from "./AppAlert";
import PasswordField from "./PasswordField";

const ResetPasswordForm = ({ token }) => {
  const [alert, setAlert] = React.useState({});
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const isPasswordMatch = (password, confirmPassword) =>  password === confirmPassword;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert({});
    setFieldErrors({});

    let responseCode;
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);

 
      if (!isPasswordMatch(formData.get("password"), formData.get("confirm_password"))) {
        setFieldErrors({ newPassword: 'Password does not match' });
        return;
      }
      const payload = {
        token,
        newPassword: formData.get("password")
      }
      const response = await sendResetPassword(payload);

      responseCode = response.responseCode;
      if (responseCode === 400 && response.responseData !== 'xx') {
        setFieldErrors(response.responseData);
        setAlert(getAlertByHttpCode(responseCode));
      } else if (responseCode === 400) {
        setAlert({
          title: 'Warning',
          message: 'Reset Token No Longer Valid. Please request again!',
          color: 'warning'
        })
        
      } else {
        setAlert(getAlertByHttpCode(responseCode));
      }
      
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
            <PasswordField
              id="password"
              name="password"
              label="Password"
              error={!!fieldErrors.newPassword}
              helperText={fieldErrors.newPassword ? fieldErrors.newPassword : ""}
            />

            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm Password"
              error={!!fieldErrors.newPassword}
              helperText={fieldErrors.newPassword ? fieldErrors.newPassword : ""}
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
              Reset
            </Button>
          </Box>
        </Box>
      </>
    </Container>
  );
};

export default ResetPasswordForm;
