export type GuestResponse = {
  success: boolean;
  message: string;
  guest?: {
    id: number;
    name: string;
  };
};
