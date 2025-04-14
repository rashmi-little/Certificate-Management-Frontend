import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cross from "../../assets/UserManagement/Cross.svg"
import { Button, FormControl, FormLabel, InputLabel, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import UserAddedSuccessModal from './UserAddedSuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/user/Action';
import { TABS } from '../../constants/Constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 444,
    height: 366,
    bgcolor: 'background.paper',
    border: "none",
};

export default function AddUserModal({ open, setOpenModal, setActiveTab }) {
    const handleClose = () => setOpenModal(false);
    const {register, handleSubmit, formState: {errors, isValid}, reset, setError} = useForm({mode: "onTouched"});
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const dispatch = useDispatch();
    const create = useSelector(store => store?.user?.create);

    const handleCancel = () => {
        console.log("Cancel ")
        handleClose();
        reset({
            firstName:"",
            lastName:"",
            email:"",
        })
    }

    const handleAddUser = (data) => {
        dispatch(createUser(data));
    }

    useEffect(()=>{
        let timeout;
        if(create?.data) {
            handleClose();
            reset({
                firstName:"",
                lastName:"",
                email:"",
            })
            timeout = setTimeout(() => {
                setOpenSuccessModal(true);
                
            }, 1000);
        }
        
        return () => clearTimeout(timeout);

    },[create?.data])

    useEffect(()=>{
        if(create?.error) {
            setError("email", {message: create?.error});
        }
    },[create?.error])


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box
                    component="form"
                    onSubmit={handleSubmit(handleAddUser)}
                    sx={{
                        ...style,
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        borderRadius: "16px",
                        padding: "24px",
                        outline: 0,
                        
                    }}>
                        <div className='h-[24px] w-full flex justify-between'>
                            <h1 className='font-roboto font-semibold text-xl leading-[100%] tracking-[0%] text-[#394555]'>Add New User</h1>
                            <img onClick={handleCancel}
                            className='h-[20px] w-[20px] cursor-pointer hover:scale-110'
                                src={Cross} alt="Cross" />
                        </div>

                        <div className='h-[198px] w-full flex flex-col gap-6'>
                            <div className='flex h-[79px] w-[396px] gap-4'>
                                <FormControl
                                >
                                    <Stack spacing={1}>
                                        <FormLabel htmlFor='firstName' sx={{ color: "#394555" }}>First Name*</FormLabel>
                                        <TextField
                                            error={!!errors?.firstName}
                                            helperText={errors?.firstName?.message}
                                            id='firstName'
                                            placeholder='George'
                                            name="firstName"
                                            {...register("firstName", {
                                                required: {
                                                    value: true,
                                                    message: "Please enter the first name"
                                                }
                                            })}
                                            sx={{
                                                color: "#5A6472",
                                                height: 52,
                                                '& .MuiInputBase-input': {
                                                    paddingX: "16px",
                                                    paddingY: "15px"
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: "12px"
                                                }
                                            }}
                                        />
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <Stack spacing={1}>
                                        <FormLabel htmlFor='lastName' sx={{ color: "#394555" }}>Last Name*</FormLabel>
                                        <TextField
                                            error={!!errors?.lastName}
                                            helperText={errors?.lastName?.message}
                                            id="lastName"
                                            placeholder='Paul'
                                            name='lastName'
                                            {...register("lastName", {
                                                required: {
                                                    value: true,
                                                    message: "Please enter the last name"
                                                }
                                            })}
                                            sx={{
                                                color: "#5A6472",
                                                height: 52,
                                                '& .MuiInputBase-input': {
                                                    paddingX: "16px",
                                                    paddingY: "15px"
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: "12px"
                                                }
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </div>

                            <div className='w-full'>
                                <FormControl>
                                    <Stack spacing={1}>
                                        <FormLabel htmlFor='email' sx={{ color: "#394555" }} >Email*</FormLabel>
                                        <TextField
                                            error={!!errors?.email}
                                            helperText={errors?.email?.message}
                                            id='email'
                                            placeholder='george.paul@example.com'
                                            fullWidth
                                            name='email'
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Please enter the email"
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Invalid email !",
                                                },
                                            })}
                                            sx={{
                                                color: "#5A6472",
                                                height: 52,
                                                width: 396,
                                                '& .MuiInputBase-input': {
                                                    paddingX: "16px",
                                                    paddingY: "15px"
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: "12px"
                                                }
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </div>
                        </div>

                        <div className='flex h-[48px]  gap-4'>
                            <Button 
                                fullWidth 
                                variant="outlined"
                                color='error'
                                onClick={handleCancel}
                                sx={{
                                    height: 48,
                                    borderRadius: "12px",
                                    border: "1px solid #F22C2C",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    fontSize: "16px"
                                }}
                                disableRipple
                            >
                                Cancel
                            </Button>
                            <Button type="submit" 
                                fullWidth 
                                variant="contained"
                                color='primary'
                                sx={{
                                    height: 48,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    backgroundColor: "#0066FF"
                                }}
                                disableRipple
                                disabled={!isValid}
                            >
                                Add User
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <UserAddedSuccessModal open={openSuccessModal} setOpenModal={setOpenSuccessModal} />
        </div>
    );
}
