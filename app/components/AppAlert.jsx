"use client";
import React, { useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import { Alert } from "@mui/joy";
import Typography from "@mui/material/Typography";

const styles = {
  marginTop: "20px",
  left: 0,
  right: 0,
  marginLeft: "auto",
  marginRight: "auto",
  zIndex: "9999",
  position: "fixed",
  width: { xs: "95%", md: "40%", xl: "40%" },
  top: 0,
};

const AppAlert = ({
  title,
  message,
  color,
  icon,
  show,
  handleClose,
  duration,
}) => {
  let display = show ? "flex-start" : "none";
  styles.display = display;
  duration = duration ? duration : 5000;

  useEffect(() => {
    let timer = setTimeout(() => handleClose(false), 5000);

    return () => clearTimeout(timer);
  }, [show, handleClose]);
  
  return (
    <Alert
      key={title}
      sx={styles}
      startDecorator={icon}
      variant="soft"
      color={color}
      onClick={handleClose}
      endDecorator={
        <IconButton variant="soft" color={color}>
          <CloseRoundedIcon />
        </IconButton>
      }
    >
      <div>
        <div>{title}</div>
        <Typography level="body-sm" color={color}>
          {message}
        </Typography>
      </div>
    </Alert>
  );
};

export default AppAlert;
