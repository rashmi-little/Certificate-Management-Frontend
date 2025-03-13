import React, { useEffect, useState } from "react";
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
import { set, useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken, login } from "../../redux/login/Action";

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
    formState: { errors, isSubmitting },
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
  const dispatch = useDispatch();
  const user = useSelector(state => state.login?.user);
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const token = useSelector(state => state.login?.token);
  const error = useSelector(state => state.login?.loginError);

  // display login error details
  useEffect(()=>{
    if(error) {
      setLoginError(error);
    }
  },[error])

  useEffect(() => {
    if (token) {
      console.log("Calling user profile from token..")
      dispatch(getUserFromToken());
    }
  }, [token])

  useEffect(()=>{
    if(user) {
      user.role === "USER" ?  navigate("/home") : navigate("/dashboard");
    }
  },[user])

  // login error message should not display when user retries
  useEffect(() => {
    setLoginError("")
  }, [watch("email"), watch("password")])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    const reqData = {
      data: {
        email: data.email,
        password: data.password,
      }
    }
    // Dispatch the login action
    dispatch(login(reqData));
    reset({
      email: "",
      password: "",
    })
  };

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
                <FormHelperText sx={{ fontSize: "0.9rem"}}>{loginError}</FormHelperText>
              </FormControl>
            )}
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained"
            disabled={isSubmitting}
            sx={{backgroundColor: isSubmitting ? "grey.500" : ""}}
            >
              {isSubmitting ?  "Signing in..." : "Sign in"}
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
    </AppTheme>
  );
}
