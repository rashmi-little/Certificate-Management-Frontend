import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, FormLabel, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../../index.css"
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/login/Action";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const passwordResetSuccess = useSelector(state => state?.login?.passwordResetSuccess);
    const passwordResetError = useSelector(state => state?.login?.passwordResetError);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    useEffect(() => {
        if (passwordResetSuccess) {
          navigate("/login");
        }
      }, [passwordResetSuccess])

    useEffect(()=>{
        if(passwordResetError) {
            setAlertMessage("Please try again")
            setOpenSnackbar(true);
        }
    },[passwordResetError])

    const handleFormSubmit = (data) => {
        console.log("Password reset successfull", data);
        const reqData = {
            password: data.confirmPassword,
        };
        dispatch(resetPassword(reqData));
        reset({
            newPassword: "",
            confirmPassword: "",
        });
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

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
                    maxWidth: "450px"
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
                                message: "Password must contain at least one digit and one special character"
                            },
                            minLength: {
                                value: 8,
                                message: "Password length be greater than 8"
                            }
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
                                value === watch("newPassword") || "Passwords do not match"
                        })}
                        required
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
                        fullWidth
                    />
                </FormControl>
                <Button 
                type="submit" fullWidth variant="contained"
                    disabled={isSubmitting}
                    sx={{ backgroundColor: isSubmitting ? "grey.500" : "",
                     }}
                >
                    Submit
                </Button>
            </Box>
            <Snackbar 
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
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


export default ResetPassword;
