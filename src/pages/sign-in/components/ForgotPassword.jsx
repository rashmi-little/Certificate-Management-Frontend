import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useForm } from "react-hook-form";
import { Alert, FormControl, FormHelperText, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink } from "../../../redux/login/Action";
import "../../../index.css"

function ForgotPassword({ open, handleClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const theme = useTheme();
  // Fullscreen on Mobile screens
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const validEmail = useSelector(state => state?.login?.validEmail);
  const passwordResetLinkSent = useSelector(state => state?.login?.passwordResetLinkSent);
  const emailError = useSelector(state => state?.login?.emailError);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleContinue = (data) => {
    console.log(data);
    const reqData = {
      email: data.email
    };
    dispatch(sendPasswordResetLink(reqData));
    reset({ email: "" })
  };

  useEffect(() => {
    if (validEmail && passwordResetLinkSent) {
      handleClose();
    }
  }, [validEmail, passwordResetLinkSent])

  useEffect(() => {
    if (emailError) {
      setOpenSnackbar(true);
      setAlertMessage("Please try again ");
    }
  }, [emailError])

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
}

  return (
    <Dialog 
     open={open} onClose={handleClose} fullScreen={isMobile}
      sx={{
        backgroundImage: "none",
        background: "#fff"
      }}>
      <DialogTitle id="forgot-password-dialog-bg" >Reset password</DialogTitle>
      <DialogContent id="forgot-password-dialog-bg"
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
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
      <DialogActions id="forgot-password-dialog-bg"
      sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(handleContinue)}>
          Submit
        </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={"error"}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
