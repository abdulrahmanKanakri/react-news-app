export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserInfo = User & {
  sources: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  authors: { id: number; name: string }[];
};
