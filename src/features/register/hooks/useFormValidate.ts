import { useState } from "react";
import type { RegisterForm, RegisterFormErrors } from "../types/register.types";

export const useFormValidate = () => {
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});
  const validate = (form: RegisterForm): boolean => {
    const newErrors: RegisterFormErrors = {};

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

    if (!form.weddingDate) {
      newErrors.weddingDate = "Wedding date is required.";
    }

    if (!form.budget) {
      newErrors.budget = "Budget is required.";
    } else if (Number(form.budget) <= 0 || Number.isNaN(Number(form.budget))) {
      newErrors.budget = "Budget must be greater than 0.";
    }

    if (!form.currencyCode) {
      newErrors.currencyCode = "Currency is required.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formErrors, setFormErrors, validate };
};
