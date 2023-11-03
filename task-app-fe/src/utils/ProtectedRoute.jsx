import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../layout/Navbar";
export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
