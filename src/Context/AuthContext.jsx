import { createContext } from "react";

// En "kasse" der deler login-data med hele appen.
// AuthProvider fylder den, og useAuth læser fra den.
export const AuthContext = createContext(null)
