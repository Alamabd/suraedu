export interface User {
  id: number;
  uid: string;
  name: string | null;
  email: string;
  photo: string | null;
  provider: string;
}