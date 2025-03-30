import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    Snackbar,
    TextField,
    useMediaQuery,
} from "@mui/material";
import "../index.css"
import Slider from "../components/Slider"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink } from "../redux/login/Action";
import Logo from "../components/Logo";
import EmailSentModal from "../components/EmailSentModal";
import { PASSWORD_LINK_SENT } from "../constants/Constants";
import { breakpoints } from "../config/breakpoints";
import { PASSWORD_RESET_LINK_SENT_CLEAR } from "../redux/login/ActionType";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ mode: "onSubmit" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [backDropOpen, setBackDropOpen] = useState(false);
    const isXs = useMediaQuery(`(max-width: ${breakpoints.xs}px)`);
    const dispatch = useDispatch();
    const passwordResetLinkSent = useSelector(state => state?.login?.passwordResetLinkSent);
    const emailError = useSelector(state => state?.login?.emailError);
    const [openModal, setOpenModal] = useState(false);
    const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
    const [emailSentSuccess, setEmailSentSuccess] = useState(false);

    useEffect(() => {
        if (passwordResetLinkSent) {
            setEmailSentSuccess(true);
            // clear the state to avoid rerender & handle loading state
            dispatch({ type: PASSWORD_RESET_LINK_SENT_CLEAR })
            setBackDropOpen(false);
            if(isMd) {
                setOpenModal(true);
            } else {
                setAlertMessage(PASSWORD_LINK_SENT);
                setOpenSnackbar(true);
            }
        }
    }, [passwordResetLinkSent])

    useEffect(() => {
        if (emailError) {
            // clear the state to avoid rerender & handle loading state
            dispatch({ type: PASSWORD_RESET_LINK_SENT_CLEAR })
            setBackDropOpen(false);
            setOpenSnackbar(true);
            setAlertMessage(emailError);
        }
    }, [emailError])

    const handleFormSubmit = (data) => {
        setEmailSentSuccess(false);
        setBackDropOpen(true);
        console.log(data);
        const reqData = {
            email: data.email
        };
        dispatch(sendPasswordResetLink(reqData));
        reset({ email: "" })
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

    return (
        <div className='login-screen flex gap-2.5'>

            <div className="hidden md:w-[51%] md:block rounded-3xl">
                <Slider />
            </div>

            <div className={`w-full md:w-[49%] bg-white rounded-3xl flex flex-col ${isXs ? "pt-10" : "justify-center"} items-center gap-10`} >
                {/* Logo */}
                <Logo />

                {/* Login Form */}
                <div className="w-[75%] max-w-md  flex flex-col gap-10">
                    <div className="text-center">
                        <h1 className={`font-bold ${isXs ? "text-xl" : "text-2xl"}`}>Forgot Password?</h1>
                        <p>Don't worry, we've got you covered!</p>
                    </div>

                    <div>
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
                                <FormLabel htmlFor="email">Enter Registered Email address</FormLabel>
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            paddingX: "10px",
                                            paddingY: "10px",
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: "12px"
                                        }
                                    }}
                                    error={!!errors?.email}
                                    helperText={errors?.email?.message}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E.g. johndoe@gmail.com"
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

                            <Button type="submit" fullWidth variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    backgroundColor: "#0066ff",
                                    "$:hover": {
                                        backgroundColor: "#0066ff"
                                    }
                                }}
                                disableRipple
                            >
                                Get Reset Password Link
                            </Button>



                        </Box>
                    </div>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={emailSentSuccess ? "success" : "error"}
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

            {isMd && <EmailSentModal open={openModal} setOpenModal={setOpenModal} />}

        </div>
    );
}

export default ForgotPassword