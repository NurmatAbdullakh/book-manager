export interface IBookBody {
  id?: string;
  title: string;
  author: string;
  description: string;
  genre: string;
}
export interface IBook {
  title: string;
  author: string;
  description: string;
  genre: string;
  id: string;
}
export interface IBackendResponse<TData = null> {
  success: boolean;
  data: TData;
  timestamp: string;
  error: string;
  pagination: null;
}
