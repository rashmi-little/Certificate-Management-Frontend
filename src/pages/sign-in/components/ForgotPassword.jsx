import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useForm } from "react-hook-form";
import { FormControl, FormHelperText, useMediaQuery, useTheme } from "@mui/material";
import OtpDialog from "../../../components/OtpDialog";

function ForgotPassword({ open, handleClose }) {
  // const [openOtp, setOtpOpen] = useState(false);
  const { register, handleSubmit,formState: {errors} } = useForm();
  const theme = useTheme();
  // Fullscreen on Mobile screens
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleContinue = (data) => {
    console.log(data);
    handleClose();

    // setOtpOpen(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}
    sx={{ backgroundImage: "none" }}>
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you an
          otp to reset your password.
        </DialogContentText>
        <FormControl fullWidth error={Boolean(errors.email)}>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your email",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email !",
            },
          })}
          fullWidth
        />
          {errors?.email && <FormHelperText>{errors.email.message}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(handleContinue)}>
          Continue
        </Button>
      </DialogActions>
      {/* <OtpDialog open={openOtp} setOtpOpen={setOtpOpen} /> */}
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
