import useSWR from "swr";
import { request } from "../request";
import { IBook, IBookBody } from "./book.types";

export const bookService = {
  get: (): Promise<IBook[]> => request.get("/books").then((res) => res.data),
  create: (data: IBookBody) => request.post("/books", data),
  update: (data: IBookBody) => request.put(`/books/${data.id}`, data),
  delete: (id: string) => request.delete(`/books/${id}`),
};

export const useBooks = () => {
  const { data, error, mutate, isLoading } = useSWR("/books", bookService.get);

  const createBook = async (book: IBookBody) => {
    if (!data) {
      return false;
    }
    const result = await bookService.create(book);
    mutate([...data, result.data]);
  };

  const updateBook = async (book: IBookBody) => {
    if (!data) {
      return false;
    }
    const { data: updatedBook } = await bookService.update(book);
    mutate(
      data.map(
        (book: IBook) => (book.id === updatedBook.id ? updatedBook : book),
        false
      )
    );
  };

  const removeBook = async (book: IBook) => {
    if (!data) {
      return false;
    }
    await bookService.delete(book.id);
    mutate(data.filter((item: IBook) => item.id === book.id, false));
  };

  return { data, error, createBook, updateBook, removeBook, isLoading };
};
