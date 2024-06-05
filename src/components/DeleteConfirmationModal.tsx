import React from "react";
import { Fade, Button, Typography, Box, Dialog } from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDeleteConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} closeAfterTransition>
      <Fade in={isOpen}>
        <Box
          sx={{
            backgroundColor: "white",
            width: 300,
            padding: 3,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete?
          </Typography>
          <Button variant="contained" color="error" onClick={onDeleteConfirm}>
            Yes, Delete
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ ml: 1 }}>
            Cancel
          </Button>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
