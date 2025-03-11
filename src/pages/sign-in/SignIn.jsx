import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "./components/CustomIcons";
import ForgotPassword from "./components/ForgotPassword";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";

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
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
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
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    watch
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginError, setLoginError] = useState("");

  // login error message should not display when user retries
  useEffect(()=>{
      setLoginError("")
  },[watch("email"), watch("password")])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    // checking the login details
    if (data.email === "user@gmail.com" && data.password === "pass") {
      localStorage.setItem("isLoggedIn", true);
      reset({
        email: "",
        password: "",
      });
      navigate("/home");
    } else {
      // Show invalid credentials message
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  // Handle sign-up click navigate
  // const handleSignUpClick = () => {
  //   navigate("/signup");
  // };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer
        // sx={{ height: "100%" }}
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
            Sign in
          </Typography>
          <Box
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
                error={errors?.email?.message}
                helperText={errors?.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
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
                error={errors?.password?.message}
                helperText={errors?.password?.message}
                name="password"
                placeholder="••••••"
                type="password"
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
              />
            </FormControl>
            {loginError && (
              <FormControl error>
                <FormHelperText>{loginError}</FormHelperText>
              </FormControl>
            )}
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
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
          {/* <Divider>or</Divider> */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button> */}
            {/* <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                onClick={handleSignUpClick}
                variant="body2"
                sx={{ alignSelf: "center", cursor: "pointer" }}
              >
                Sign up
              </Link>
            </Typography> */}
          </Box>
          
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
