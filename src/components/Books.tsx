import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import BookCard from "./BookCard";
import { IBook } from "../api/book/book.types";
import { useBooks } from "../api/book/book.service";
import { IBookFormValues } from "./BookForm";
import BookModal from "./BookModal";
import Message from "./Message";
import { Empty } from "../assets/Empty";

const Books = () => {
  const { data: books, createBook, removeBook, updateBook } = useBooks();
  const [selectedBook, setSelectedBook] = useState<IBook | null>({
    title: "",
    author: "",
    description: "",
    genre: "",
    id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (books) {
      const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)));
      setGenres(uniqueGenres);
    }
  }, [books]);

  const handleCreateBook = (values: IBookFormValues) => {
    createBook(values);
    handleCloseModal();
  };

  const handleOpenModal = (book?: IBook) => {
    setSelectedBook(book || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (values: IBookFormValues) => {
    updateBook(values);
    handleCloseModal();
  };

  const filteredBooks = books?.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      (!filterGenre || book.genre.toLowerCase() === filterGenre.toLowerCase())
    );
  });

  return (
    <Container>
      {/* header */}
      <Grid container alignItems={"center"} spacing={2} mb={2}>
        <Grid
          display={"flex"}
          gap={2}
          alignItems={"center"}
          item
          xs={12}
          sm={4}
        >
          <Typography variant="h4">Books</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Add Book
          </Button>
        </Grid>
      </Grid>

      {/* filter */}
      <Grid container alignItems={"center"} spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Filter by genre"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres?.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* book cards */}
      {books?.length === 0 ? (
        <Message message="No books" icon={<Empty />} />
      ) : !filteredBooks?.length ? (
        <Message message="No matches" icon={<Empty />} />
      ) : (
        <Grid container spacing={2}>
          {filteredBooks?.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard
                book={book}
                onUpdate={() => handleOpenModal(book)}
                onDelete={() => removeBook(book)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* book modal */}
      <BookModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedBook ? handleUpdateBook : handleCreateBook}
        initialValues={selectedBook}
        title={selectedBook ? "Update Book" : "Add Book"}
      />
    </Container>
  );
};

export default Books;
