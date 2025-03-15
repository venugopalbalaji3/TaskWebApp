import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const isAuth = localStorage.getItem("token")

    return isAuth ? children : <Navigate to="/login" />;
};

export default AuthGuard;
