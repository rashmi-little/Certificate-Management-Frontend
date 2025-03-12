import React, { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, useTheme, useMediaQuery } from "@mui/material";

export default function OtpDialog({ open, setOtpOpen }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const theme = useTheme();
  // Fullscreen on Mobile screens
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return; // Only allow numeric values

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Ensure only one digit
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    setOtpOpen(false);
    console.log("OTP submitted successfully: ", otp.join(""));
  };

  const handleOtpModalClose = () => {
    setOtpOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleOtpModalClose} fullScreen={fullScreen}>
      <DialogTitle>Enter OTP</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputRef={(el) => (inputRefs.current[index] = el)}
              variant="outlined"
              size="medium"
              sx={{ width: 50, textAlign: "center" }}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOtpModalClose}>Cancel</Button>
        <Button onClick={handleOtpSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
