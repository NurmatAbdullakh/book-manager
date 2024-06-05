import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { IBook, IBookBody } from "../api/book/book.types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface props {
  book: IBook;
  onUpdate: (book: IBookBody) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<props> = ({ book, onUpdate, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(book.id);
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <Card sx={{ minWidth: 275, mb: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {book?.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {book?.author}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
            }}
          >
            {book?.description}
          </Typography>
          <Typography sx={{ mt: 1 }} color="text.secondary">
            Genre: {book?.genre}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="update" onClick={() => onUpdate(book)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default BookCard;
