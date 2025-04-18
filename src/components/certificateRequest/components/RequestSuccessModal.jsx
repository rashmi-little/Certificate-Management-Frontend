import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import yes from "../../../assets/yes.png";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_STATE } from "../../../redux/certificate/ActionType";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400, md: 600 },
  bgcolor: "background.paper",
  border: "none",
};

export default function RequestSuccessModal({
  open,
  setOpenModal,
  totalCertificate,
  type,
}) {
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const certificateRequestId = useSelector((store) => store.certificate?.certificateRequestId);
  console.log(certificateRequestId);
  

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
                Request {type}!
              </h1>
              <p className="text-[#757D8A] text-base font-normal font-roboto">
                Your request for issuing {totalCertificate} certificates is{" "}
                {type.toLowerCase()} successfully!
              </p>
            </div>

            <div className="flex w-full gap-3">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleClose();
                  dispatch({type : RESET_STATE});
                  navigate('/dashboard')
                }}
                sx={{
                  height: 48,
                  borderRadius: "12px",
                  textTransform: "none",
                  border: "1px solid #0066FF",
                  color: "#0066FF",
                  fontSize: "16px",
                  fontWeight: 500,
                  "&:hover": {
                    border: "1px solid #0066FF",
                    backgroundColor: "rgba(0, 102, 255, 0.04)",
                  },
                }}
                disableRipple
              >
                Go to Dashboard
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleClose();
                  dispatch({type : RESET_STATE});
                  navigate(`/logs/view-request/${certificateRequestId}`)
                }}
                sx={{
                  height: 48,
                  borderRadius: "12px",
                  textTransform: "none",
                  backgroundColor: "#0066FF",
                  fontSize: "16px",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#0052CC",
                  },
                }}
                disableRipple
              >
                View Request Details
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
