import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardMedia,
  Button,
  Box,
  Typography,
} from "@mui/material";
export const TemplateModal = ({ open, onClose, templateUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" className="mr-3 h-auto">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" color="#0066FF">
          Template Preview
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            borderRadius: 3,
            padding: 2,
            backgroundColor: "#FAFAFA",
          }}
        >
          <CardMedia
            component="img"
            image={templateUrl}
            alt="Template"
            sx={{
              maxHeight: "50vh",
              objectFit: "contain",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          />
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Close
            </Button>
          </Box>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
