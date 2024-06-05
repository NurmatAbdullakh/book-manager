import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import BookForm, { IBookFormValues, initialValuesForm } from "./BookForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IBookFormValues) => void;
  initialValues?: IBookFormValues | null;
  title: string;
}

const BookModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  title,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <BookForm
          initialValues={initialValues || initialValuesForm}
          onSubmit={onSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          form="book-form"
          type="submit"
          onClick={() => onSubmit}
          color="primary"
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
