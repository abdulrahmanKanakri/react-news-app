export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
