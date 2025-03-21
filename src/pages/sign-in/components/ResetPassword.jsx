import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { CircularProgress, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AppTheme from "../../shared-theme/AppTheme";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/login/Action";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const passwordResetSuccess = useSelector(
    (state) => state?.login?.passwordResetSuccess
  );
  const passwordResetError = useSelector(
    (state) => state?.login?.passwordResetError
  );
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");

  useEffect(() => {
    if (passwordResetSuccess) {
      navigate("/login");
    }
  }, [passwordResetSuccess]);

  useEffect(() => {
    if (passwordResetError) {
      setAlertMessage(passwordResetError);
      setOpenSnackbar(true);
    }
  }, [passwordResetError]);

  const handleFormSubmit = (data) => {
    const reqData = {
      newPassword: data.confirmPassword,
      token: token,
    };

    // console.log("Password reset successfull", reqData);
    dispatch(resetPassword(reqData));

    reset({
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

    return (
      <div className="reset-password-bg">
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingX: 4,
            gap: 2,
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <TextField
              error={!!errors?.newPassword} // Highlights the textfield with red border, if validation fails
              helperText={errors?.newPassword?.message}
              name="newPassword"
              placeholder="Enter new password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Please enter the password",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                  message:
                    "Password must contain at least one digit and one special character",
                },
                minLength: {
                  value: 8,
                  message: "Password length be greater than 8",
                },
              })}
              required
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <TextField
              error={!!errors?.confirmPassword} // Highlights the textfield with red border, if validation fails
              helperText={errors?.confirmPassword?.message}
              name="confirmPassword"
              placeholder="Re enter new password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please enter confirm password",
                },
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              required
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          border: "none",
                          outline: "none",
                          "&:focus": { outline: "none" },
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />
          </FormControl>
          <Button
            id="reset-password-submit"
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ backgroundColor: isSubmitting ? "grey.500" : "" }}
          >
            Submit
          </Button>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={passwordResetSuccess ? "success" : "error"}
            variant="filled"
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }

  // const handlePasswordVisibility = () => {
  //   setShowPassword((prev) => !prev); // Toggle the showPassword state
  // };

  // const Card = styled(MuiCard)(({ theme }) => ({
  //   display: "flex",
  //   flexDirection: "column",
  //   alignSelf: "center",
  //   width: "100%",
  //   padding: theme.spacing(4),
  //   gap: theme.spacing(2),
  //   margin: "auto",
  //   [theme.breakpoints.up("sm")]: {
  //     maxWidth: "450px",
  //   },
  // }));

  // const SignInContainer = styled(Stack)(({ theme }) => ({
  //   height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  //   minHeight: "100%",
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up("sm")]: {
  //     padding: theme.spacing(4),
  //   },
  //   "&::before": {
  //     content: '""',
  //     display: "block",
  //     position: "absolute",
  //     zIndex: -1,
  //     inset: 0,
  //   },
  // }));

//   return (
//     <AppTheme>
//       <CssBaseline enableColorScheme />

//       <SignInContainer
//         // sx={{ height: "100%" }}
//         direction="column"
//         alignContent="center"
//         justifyContent="space-between"
//         id="signInContainer"
//       >
//         <Card id="cardContainer" variant="outlined" className="">
//           {/* <SitemarkIcon /> */}
//           <Typography
//             component="h1"
//             variant="h4"
//             sx={{
//               width: "100%",
//               fontSize: "clamp(2rem, 10vw, 2.15rem)",
//               textAlign: "center",
//             }}
//           >
//             Reset Password
//           </Typography>
//           <Box
//             noValidate
//             component="form"
//             onSubmit={handleSubmit(handleFormSubmit)}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               gap: 2,
//             }}
//           >
//             <FormControl>
//               <FormLabel htmlFor="newPassword">New Password</FormLabel>
//               <TextField
//                 error={!!errors?.newPassword} // Highlights the textfield with red border, if validation fails
//                 helperText={errors?.newPassword?.message}
//                 name="newPassword"
//                 placeholder="Enter new password"
//                 type="password"
//                 id="newPassword"
//                 autoComplete="current-password"
//                 {...register("newPassword", {
//                   required: {
//                     value: true,
//                     message: "Please enter the password",
//                   },
//                   pattern: {
//                     value: /^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
//                     message:
//                       "Password must contain at least one digit and one special character",
//                   },
//                   minLength: {
//                     value: 8,
//                     message: "Password length be greater than 8",
//                   },
//                 })}
//                 required
//                 variant="outlined"
//                 fullWidth
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//               <TextField
//                 error={!!errors?.confirmPassword} // Highlights the textfield with red border, if validation fails
//                 helperText={errors?.confirmPassword?.message}
//                 name="confirmPassword"
//                 placeholder="Re enter new password"
//                 type={showPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 autoComplete="current-password"
//                 {...register("confirmPassword", {
//                   required: {
//                     value: true,
//                     message: "Please enter confirm password",
//                   },
//                   validate: (value) =>
//                     value === watch("newPassword") || "Passwords do not match",
//                 })}
//                 required
//                 variant="outlined"
//                 slotProps={{
//                   input: {
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={handlePasswordVisibility}
//                           edge="end"
//                           sx={{
//                             border: "none",
//                             outline: "none",
//                             "&:focus": { outline: "none" },
//                             "&:hover": { backgroundColor: "transparent" },
//                           }}
//                         >
//                           {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//                 fullWidth
//               />
//             </FormControl>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={isSubmitting}
//               sx={{ backgroundColor: isSubmitting ? "grey.500" : "" }}
//             >
//               {isSubmitting ? "Submitting" : "Submit"}
//             </Button>
//           </Box>
//         </Card>
//       </SignInContainer>

//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           variant="filled"
//         >
//           {alertMessage}
//         </Alert>
//       </Snackbar>
//     </AppTheme>
//   );
// }

export default ResetPassword;
