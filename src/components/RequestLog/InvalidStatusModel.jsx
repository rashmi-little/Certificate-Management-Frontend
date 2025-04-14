import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 269,
  bgcolor: "background.paper",
  border: "none",
  //   boxShadow: 24,
  p: 4,
};

export default function InvalidStatusModel({ open, setOpenModal }) {
  const handleClose = () => setOpenModal(false);

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
            sx={{
              ...style,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 4,
              outline: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ErrorOutline sx={{ color: "orange", fontSize: "50px" }} />
            </div>

            <div className="space-y-1 flex justify-center flex-col ">
              <h1 className="font-bold text-xl flex justify-center">
                Invalid Status
              </h1>
              <p className="text-[#535862] flex justify-center">
                Only Scheduled requests can be edited!
              </p>
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClose}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  backgroundColor: "#0066ff",
                  "$:hover": {
                    backgroundColor: "#0066ff",
                  },
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
