import { useState } from "react";
import type { RegisterForm } from "../types/register.types";

export const useFormValidate = () => {
  const [formErrors, setFormErrors] = useState<Partial<RegisterForm>>({});
  const validate = (form: RegisterForm): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formErrors, setFormErrors, validate };
};
