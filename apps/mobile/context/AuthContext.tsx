import { createContext, useContext, useState, useEffect } from "react";
import { saveToken, getToken, deleteToken } from "@/lib/secureStore";

type AuthContextType = {
  user: any; // Or you can define a more specific type like User | null
  token: string | null;
  login: (token: string, user: any) => void; // Passing user along with token
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // Add state for user

  useEffect(() => {
    getToken().then((storedToken) => {
      setToken(storedToken);
      // Optionally fetch user info using the token here
    });
  }, []);

  const login = async (newToken: string, newUser: any) => {
    console.log("Auth LOGIN CONTEXT+++++++", newToken, newUser);
    await saveToken(newToken);
    setToken(newToken);
    setUser(newUser); // Set user after login
  };

  const logout = async () => {
    await deleteToken();
    setToken(null);
    setUser(null); // Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
