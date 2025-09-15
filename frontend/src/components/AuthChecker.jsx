import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/API";

function AuthChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.me();
        if (res) {
          navigate("/app");
        }
      } catch (err) {
        console.error("Erreur survenue lors de check auth:", err);
      }
    };
    checkAuth();
  }, []);

  return null; // rien à afficher
}

export default AuthChecker;
