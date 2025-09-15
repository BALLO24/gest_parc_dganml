// PrivateRoute.jsx
import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p><ImSpinner/></p>; // ou un spinner

  if (!user) return <Navigate to="/" replace />;

  return children;
}
