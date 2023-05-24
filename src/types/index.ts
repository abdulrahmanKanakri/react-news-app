export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  sources: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  authors: { id: number; name: string }[];
}
