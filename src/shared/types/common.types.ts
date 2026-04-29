export type User = {
  name: string;
  email: string;
  weddingDate: Date;
};

export type Login = {
  email: string;
  password: string;
};

// API Response

export type UserResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    weddingDate: Date;
  };
};
