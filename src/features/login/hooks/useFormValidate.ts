import { useState } from "react";
import type { LoginForm } from "../types/login.types";

export const useFormValidate = () => {
  const [formErrors, setFormErrors] = useState<Partial<LoginForm>>({});
  const validate = (form: LoginForm): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formErrors, setFormErrors, validate };
};
