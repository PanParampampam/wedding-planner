export type navItemProps = {
  label: string;
  path: string;
};

export type User = {
  name: string;
  email: string;
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
    name: string;
    id: string;
    email: string;
  };
};
