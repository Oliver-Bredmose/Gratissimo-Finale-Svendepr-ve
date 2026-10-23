import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

// Giver adgang til { user, login, logout, updateUser } i alle komponenter
// fx: const { user } = useAuth()
export function useAuth() {
    return useContext(AuthContext)
}
