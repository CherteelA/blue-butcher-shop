interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  created_at: string;
  admin: boolean;
}

interface UserAuth{
  token: string  | null;
  user: User  | null;
  message: string | null;
}
