import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    Snackbar,
    TextField,
    useMediaQuery,
} from "@mui/material";
import Logo from "../components/Logo"
import Slider from "../components/Slider"
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordSavedModal from "../components/PasswordSavedModal";
import { resetPassword } from "../redux/login/Action";
import { breakpoints } from "../config/breakpoints";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({ mode: "onBlur" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [backDropOpen, setBackDropOpen] = useState(false);
    const isXs = useMediaQuery(`(max-width: ${breakpoints.xs}px)`);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
    const location = useLocation();
    const passwordResetSuccess = useSelector(
        (state) => state?.login?.passwordResetSuccess
    );
    const passwordResetError = useSelector(
        (state) => state?.login?.passwordResetError
    );

    useEffect(() => {
        if (passwordResetSuccess) {
            setBackDropOpen(false);
            if(isSm) {
                setOpenModal(true);
            } else {
                navigate("/login");
            }
        }
    }, [passwordResetSuccess]);

    useEffect(() => {
        if (passwordResetError) {
            setBackDropOpen(false);
            setAlertMessage(passwordResetError);
            setOpenSnackbar(true);
        }
    }, [passwordResetError]);

    const handleFormSubmit = (data) => {
        setBackDropOpen(true);
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        const reqData = {
            newPassword: data.confirmPassword,
            token: token,
        };
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
        <div className='login-screen flex gap-2.5'>

            <div className="hidden md:w-[51%] md:block rounded-3xl">
                <Slider />
            </div>

            <div className={`w-full md:w-[49%] bg-white rounded-3xl flex flex-col ${isXs ? "pt-10" : "justify-center"} items-center gap-10`} >
                {/* Logo */}
                <Logo />

                {/* Login Form */}
                <div className="w-[75%] max-w-md   flex flex-col gap-5 md:gap-10">
                    <div className="flex flex-col text-center gap-2">
                        <h1 className={`font-bold ${isXs ? "text-xl" : "text-2xl"}`}>Reset Your Password</h1>
                        <p>Create a new password below</p>
                    </div>

                    <div className="max-w-md">
                        <Box
                            noValidate
                            component="form"
                            onSubmit={handleSubmit(handleFormSubmit)}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                // width: "100%",
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="newPassword"
                                    sx={{
                                        color: "black",
                                        "&.Mui-focused": {
                                            color: "black !important"
                                        }
                                    }}
                                >Create New Password</FormLabel>
                                <TextField
                                    sx={{
                                        color: "black",
                                        '& .MuiInputBase-input': {
                                            paddingX: "10px",
                                            paddingY: "10px"
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "12px"
                                        }
                                    }}
                                    error={!!errors?.newPassword}
                                    helperText={errors?.newPassword?.message}
                                    name="newPassword"
                                    placeholder="Create New Password"
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    autoComplete="current-password"
                                    {...register("newPassword", {
                                        required: {
                                            value: true,
                                            message: "Please enter password",
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

                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="confirmPassword"
                                    sx={{
                                        color: "black",
                                        "&.Mui-focused": {
                                            color: "black !important"
                                        }
                                    }}
                                >Confirm New Password</FormLabel>
                                <TextField
                                    sx={{
                                        color: "black",
                                        '& .MuiInputBase-input': {
                                            paddingX: "10px",
                                            paddingY: "10px"
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "12px"
                                        }
                                    }}
                                    error={!!errors?.confirmPassword}
                                    helperText={errors?.confirmPassword?.message}
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    type="password"
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
                                    fullWidth
                                    variant="outlined"
                                />

                                {/* <div>
                                    {loginError && (
                                        <FormControl error>
                                            <FormHelperText sx={{ fontSize: "0.9rem" }}>{loginError}</FormHelperText>
                                        </FormControl>
                                    )}
                                </div> */}
                            </FormControl>

                            <Button type="submit" fullWidth variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    // marginTop: justAboveMdScreen ?"8px" : "",
                                    backgroundColor: "#0066ff",
                                    "$:hover": {
                                        backgroundColor: "#0066ff"
                                    }
                                }}
                                disableRipple
                            >
                                Submit
                            </Button>



                        </Box>
                    </div>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="error"
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

            {isSm && <PasswordSavedModal open={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
}

export default ResetPassword