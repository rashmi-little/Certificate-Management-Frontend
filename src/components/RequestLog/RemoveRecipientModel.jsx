import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Cross from "../../assets/RequestLog/Cross.svg";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  height: 190 + 24,
  bgcolor: "background.paper",
  border: "none",
};

export default function RemoveRecipientModel({ open, onClose, onConfirm, isDeleting }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
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
            sx={{
              ...style,
              display: "flex",

              flexDirection: "column",
              gap: "28px",
              borderRadius: "16px",
              padding: "24px",
              outline: 0,
            }}
          >
            <div className="h-[23px] w-full flex justify-between">
              <h1 className="font-roboto font-semibold text-xl leading-[100%] tracking-[0%] text-[#394555]">
                Remove user?
              </h1>
              <img
                onClick={onClose}
                className="h-[20px] w-[20px] cursor-pointer hover:scale-110"
                src={Cross}
                alt="Cross"
              />
            </div>

            <div className="h-[38px] w-full flex flex-col gap-6">
              <p className="font-roboto font-normal text-base color-[#757D8A]">
                Are you sure you want to delete this Recipient ? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex h-[48px]  gap-4">
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={onConfirm}
                disabled={isDeleting}
                sx={{
                  height: 48,
                  borderRadius: "12px",
                  border: "1px solid #F22C2C",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
                disableRipple
              >
                {isDeleting ? "Deleting..." : "Yes, remove Recipient!"}
              </Button>
              <Button
                onClick={onClose}
                disabled={isDeleting}
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  height: 48,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  backgroundColor: "#0066FF",
                }}
                disableRipple
              >
                No, don’t remove
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
