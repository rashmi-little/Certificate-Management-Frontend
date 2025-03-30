import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import yes from "../assets/yes.png"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 269,
    bgcolor: 'background.paper',
    border: "none",
    //   boxShadow: 24,
    p: 4,
};

export default function PasswordSavedModal({ open, setOpenModal }) {
    const handleClose = () => setOpenModal(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

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
                    <Box sx={{
                        ...style,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        borderRadius: 4,
                        outline: 0,
                    }}>
                        <div>
                            <img className='h-[40px] w-[40px]'
                                src={yes} alt="Tick Mark Image" />
                        </div>

                        <div className='space-y-1'>
                            <h1 className='font-bold text-xl'>Password Saved Successfully!</h1>
                            <p className='text-[#535862]'>Password is now saved successfully.You can use your new password to login.</p>
                        </div>

                        <div>
                            <Button type="submit" fullWidth variant="contained"
                                onClick={handleLogin}
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
                                Login
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
