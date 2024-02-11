import { Navigate } from "react-router-dom";

// Example of protecting a route in React
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the component
  return element;
};
export default ProtectedRoute;
