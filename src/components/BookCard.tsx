import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { IBook, IBookBody } from "../api/book/book.types";

export interface props {
  book: IBook;
  onUpdate: (book: IBookBody) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<props> = ({ book, onUpdate, onDelete }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {book?.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {book?.author}
        </Typography>
        <Typography variant="body2">{book?.description}</Typography>
        <Typography sx={{ mt: 1 }} color="text.secondary">
          Genre: {book?.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onUpdate(book)}>
          Update
        </Button>
        <Button size="small" onClick={() => onDelete(book.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
