import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null); // Ensure default value is null

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUser({ token });
    }, []);

    const login = (token) => {
        console.log(token,'token')
        localStorage.setItem("token", token.accessToken);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
