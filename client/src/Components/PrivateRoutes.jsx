import UseAuthStatus from "../hooks/UseAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();
  if (checkingStatus) {
    return <h1>Loading...</h1>;
  }
  return <div>{loggedIn ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default PrivateRoutes;
