import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import API from "../services/API";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const data = await API.me();
    if (data) {
      setUser({ userId: data.userId, userName: data.userName });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
