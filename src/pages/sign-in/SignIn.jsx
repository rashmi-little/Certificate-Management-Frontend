import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ForgotPassword from "./components/ForgotPassword";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { useForm } from "react-hook-form";
import { Alert, Backdrop, CircularProgress, FormHelperText, IconButton, InputAdornment, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken, login } from "../../redux/login/Action";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
  },
}));

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    watch
  } = useForm({
    mode: "onSubmit"
  });
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.login?.user);
  const token = useSelector(state => state.login?.token);
  const error = useSelector(state => state.login?.loginError);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const passwordResetSuccess = useSelector(state => state?.login?.passwordResetSuccess);
  const passwordResetLinkSent = useSelector(state => state?.login?.passwordResetLinkSent);
  const [backDropOpen, setBackDropOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setBackDropOpen(false);
      setLoginError(error);
    }
  }, [error])

  useEffect(() => {
    if (token) {
      console.log("After Logout, I still have the token with me", token);
      dispatch(getUserFromToken());
    }
  }, [token])

  useEffect(() => {
    if (user && token) {
      setBackDropOpen(false);
      navigate("/dashboard")
    }
  }, [user])

  // login error message should not display when user retries
  useEffect(() => {
    setLoginError("")
  }, [watch("email"), watch("password")])

  useEffect(() => {
    if (passwordResetSuccess) {
      setAlertMessage("Password reset success ");
      setOpenSnackbar(true);
    }
  }, [passwordResetSuccess])

  useEffect(() => {
    if (passwordResetLinkSent) {
      setAlertMessage("Password reset link sent ");
      setOpenSnackbar(true);
    }
  }, [passwordResetLinkSent])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  const handleFormSubmit = (data) => {
    setBackDropOpen(true);
    console.log(data);
    const reqData = {
      data: {
        email: data.email,
        password: data.password,
      }
    }
    dispatch(login(reqData));
    reset({
      email: "",
      password: "",
    })
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <SignInContainer
        sx={{ boxShadow: 3 }}
        direction="column"
        alignContent="center"
        justifyContent="space-between"
        id="signInContainer"
      >
        <Card id="cardContainer" variant="outlined" className="">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Logo
          </Typography>
          <Box
            noValidate
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={!!errors?.email}
                helperText={errors?.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
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
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={!!errors?.password}
                helperText={errors?.password?.message}
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
                required
                fullWidth
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" >
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)} edge="end"
                          sx={{
                            border: "none", outline: "none",
                            "&:focus": { outline: "none" },
                            "&:hover": { backgroundColor: "transparent" }
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </FormControl>
            {loginError && (
              <FormControl error>
                <FormHelperText sx={{ fontSize: "0.9rem" }}>{loginError}</FormHelperText>
              </FormControl>
            )}
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained"
              disabled={isSubmitting}
              sx={{ backgroundColor: isSubmitting ? "grey.500" : "" }}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
        </Card>
      </SignInContainer>

      <Snackbar
        sx={{
          backgroundColor: passwordResetSuccess ? "green" : "red",
          color: "white"
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Backdrop
        open={backDropOpen}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    </AppTheme>
  );
}
