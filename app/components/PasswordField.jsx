// components/PasswordField.js
import React, { useState, useEffect } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordField = ({ id, name, label, error, helperText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTimer, setShowPasswordTimer] = useState(null);

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

  useEffect(() => {
    return () => {
      if (showPasswordTimer) {
        clearTimeout(showPasswordTimer);
      }
    };
  }, [showPasswordTimer]);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      id={id}
      error={!!error}
      helperText={helperText ? helperText : ""}
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
      {...props}
    />
  );
};

export default PasswordField;
