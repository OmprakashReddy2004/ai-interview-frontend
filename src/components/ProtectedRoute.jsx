import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  // Firebase takes a second to load user info — handle that:
  if (user === undefined) return null;

  return user ? children : <Navigate to="/signin" replace />;
}
