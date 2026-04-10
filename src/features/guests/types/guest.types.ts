export type Guest = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: {
    country?: string;
    city: string;
    street: string;
    zipCode: string;
  };
  status: "invited" | "confirmed" | "declined";
  group: "family" | "friends" | "coworkers" | "other";
  plusOne: "on the list" | "outside the list" | "none";
  plusOneName?: string;
  dietaryRestrictions?: "vegetarian" | "vegan" | "gluten free";
  notes?: string;
};
