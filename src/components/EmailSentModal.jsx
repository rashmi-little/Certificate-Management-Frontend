import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import yes from "../assets/yes.png"
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 309,
    bgcolor: 'background.paper',
    border: "none",
    //   boxShadow: 24,
    p: 4,
};

export default function EmailSentModal({ open, setOpenModal }) {
    const handleClose = () => setOpenModal(false);
    

    const handleOpenMailBox = () => {
        window.open("https://mail.google.com/", "_blank")
        handleClose();
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
                            <h1 className='font-bold text-xl'>Email Sent</h1>
                            <p className='text-[#535862]'>The password reset link is shared to your entered email ID.</p>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <Button type="submit" fullWidth variant="contained"
                                onClick={handleOpenMailBox}
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
                                Open Mail Box
                            </Button>

                            <Button type="submit" fullWidth variant="outlined"
                                onClick={handleClose}
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    backgroundColor: "",
                                    "$:hover": {
                                        backgroundColor: "transparent"
                                    }
                                }}
                                disableRipple
                            >
                                Close
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
