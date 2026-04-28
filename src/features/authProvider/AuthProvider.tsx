import { AuthContext } from "./context/AuthProvider.context";
import { useAuthProvider } from "./hooks/useAuthProvider";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, login, logout } = useAuthProvider();

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
