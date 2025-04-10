import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import yes from "../../assets/yes.png";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 273,
  bgcolor: "background.paper",
  border: "none",
};

export default function RequestUpdateModel({ open, setOpenModal, requestId,type }) {
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
              alignItems: "center",
              gap: 3,
              borderRadius: "16px",
              padding: 3,
              outline: 0,
            }}
          >
            <div>
              <img
                className="h-[60px] w-[60px]"
                src={yes}
                alt="Tick Mark Image"
              />
            </div>

            <div className="h-[69px] flex flex-col gap-2 text-center">
              <h1 className="font-semibold text-xl font-roboto text-[#394555]">
                {type} Saved
              </h1>
              <p className="text-[#757D8A] text-base font-normal font-roboto">
                The new changes to the {type}(ID-{requestId}) saved
                successfully.
              </p>
            </div>

            <div className="flex w-full font-medium text-xl text-[#0066FF]">
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={handleClose}
                sx={{
                  height: 48,
                  borderRadius: "12px",
                  textTransform: "none",
                  border: "1px solid #0066FF",
                  fontSize: "20px",
                }}
                disableRipple
              >
                Done
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
