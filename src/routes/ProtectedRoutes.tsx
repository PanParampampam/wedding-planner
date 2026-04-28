import { Navigate, Route, Routes } from "react-router-dom";
import Budget from "src/features/budget/Budget";
import Guests from "src/features/guests/Guests";
import Home from "src/features/home/Home";

import DashboardLayout from "src/shared/layouts/DashboardLayout";

export default function ProtectedRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </DashboardLayout>
  );
}
