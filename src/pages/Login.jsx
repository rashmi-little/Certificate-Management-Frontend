import {
    Alert,
    Backdrop,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    TextField,
    useMediaQuery,
} from "@mui/material";
import "../index.css"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Slider from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken, login } from "../redux/login/Action";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import InvalidLoginModal from "../components/InvalidLoginModal";
import { breakpoints } from "../config/breakpoints";
import { CLEAR_LOGIN_ERROR } from "../redux/login/ActionType";
import { PASSWORD_RESET } from "../constants/Constants";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({ mode: "onBlur" });
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [backDropOpen, setBackDropOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.login?.user);
    const token = useSelector(state => state.login?.token);
    const error = useSelector(state => state.login?.loginError);
    // Break points to style inside sx prop
    const isLessThanSm = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
    const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const isXs = useMediaQuery(`(max-width: ${breakpoints.xs}px)`);
    const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
    const [openModal, setOpenModal] = useState(false);
    const passwordResetSuccess = useSelector(
        (state) => state?.login?.passwordResetSuccess
    );

    useEffect(() => {
        if (error) {
            // clear the error state to avoid rerender
            dispatch({ type: CLEAR_LOGIN_ERROR });
            setBackDropOpen(false);
            if (isLessThanSm) {
                console.log("About to display the error");
                setLoginError(error)
                console.log(error);

            } else {
                setOpenModal(true);
            }
        }
    }, [error])

    useEffect(() => {
        if (token) {
            dispatch(getUserFromToken());
        }
    }, [token])

    useEffect(() => {
        if (user && token) {
            reset({
                email: "",
                password: "",
            })
            setBackDropOpen(false);
            navigate("/dashboard")
        }
    }, [user])

    useEffect(() => {
        if (passwordResetSuccess) {
            setBackDropOpen(false);
            if (!isSm) {
                setAlertMessage(PASSWORD_RESET);
                setOpenSnackbar(true);
            }
        }
    }, [passwordResetSuccess]);

    // login error message should not display when user retries
    useEffect(() => {
        setLoginError("")
    }, [watch("email"), watch("password"), watch("keepLoggedIn")])

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

    const handleForgotPasswordClick = () => {
        navigate("forgot-password")
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='login-screen flex gap-4 p-4'>

            <div className={`w-full  md:w-[49%] bg-white rounded-3xl flex flex-col  ${isXs ? "pt-5" : "justify-center"} items-center gap-16`} >
                {/* Logo */}
                <Logo />

                {/* Login Form */}
                <div className="w-[75%] max-w-md  flex flex-col gap-3">
                    <div className="text-center">
                        <h1 className="font-bold text-3xl">Login</h1>
                        <p>Welcome back</p>
                    </div>

                    <div>
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
                                <FormLabel htmlFor="email">Email address</FormLabel>
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            paddingX: "10px",
                                            paddingY: "10px",
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "10px"
                                        }
                                    }}
                                    error={!!errors?.email}
                                    helperText={errors?.email?.message}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
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
                                <FormLabel htmlFor="password"
                                    sx={{
                                        color: "black",
                                        "&.Mui-focused": {
                                            color: "black !important"
                                        }
                                    }}
                                >Password</FormLabel>
                                <TextField
                                    sx={{
                                        color: "black",
                                        '& .MuiInputBase-input': {
                                            paddingX: "10px",
                                            paddingY: "10px"
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "10px"
                                        }
                                    }}
                                    error={!!errors?.password}
                                    helperText={errors?.password?.message}
                                    name="password"
                                    placeholder="****************"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Please enter password",
                                        },
                                        pattern: {
                                            value: /^\S+$/,  // Regular expression to check for spaces
                                            message: "Password cannot contain spaces",
                                        }
                                    })}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <IconButton disableRipple
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
                                <div className={`flex flex-col md:flex-row md:justify-between`}>

                                    <FormControlLabel
                                        sx={{
                                            "& .MuiTypography-root": {
                                                fontSize: "14px"
                                            }
                                        }}
                                        control={<Checkbox
                                            name="keepLoggedIn"
                                            {...register("keepLoggedIn")}
                                            defaultChecked size="small"
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    borderRadius: '20px', // Adjust border-radius here
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'transparent', // Removes hover background
                                                },
                                                '& .MuiTouchRipple-root': {
                                                    display: 'none', // Disables ripple effect
                                                }
                                            }}
                                        />} label="Keep me logged in" />

                                    <Link
                                        component="button"
                                        type="button"
                                        onClick={handleForgotPasswordClick}
                                        variant="body2"
                                        sx={{
                                            alignSelf: "center", color: "#394555",
                                            textDecoration: "none",
                                            ":hover": {
                                                textDecoration: "underline",
                                                textDecorationColor: "#394555"
                                            }
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div>
                                    {loginError && (
                                        <FormControl error>
                                            <FormHelperText sx={{ fontSize: "0.9rem" }}>{loginError}</FormHelperText>
                                        </FormControl>
                                    )}
                                </div>
                            </FormControl>

                            <Button type="submit" fullWidth variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    marginTop: isMd ? "" : "8px",
                                    backgroundColor: "#0066ff",
                                    "$:hover": {
                                        backgroundColor: "#0066ff"
                                    }
                                }}
                                disableRipple
                            >
                                Sign In
                            </Button>



                        </Box>
                    </div>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        variant="standard"
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>

                <Backdrop
                    open={backDropOpen}
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="error" />
                </Backdrop>
            </div>

            <div className="hidden md:block md:w-[51%] rounded-3xl slide-show">
                <Slider />
            </div>

            {isSm && <InvalidLoginModal open={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
}

export default Login