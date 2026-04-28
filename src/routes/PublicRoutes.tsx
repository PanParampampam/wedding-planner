import { Navigate, Route, Routes } from "react-router-dom";
import Login from "src/features/login/Login";
import Register from "src/features/register/Regiester";
import LoginLayout from "src/shared/layouts/LoginLayout";

export default function PublicRoutes() {
  return (
    <LoginLayout>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </LoginLayout>
  );
}
