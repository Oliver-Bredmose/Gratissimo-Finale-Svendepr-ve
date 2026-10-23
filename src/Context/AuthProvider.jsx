import { useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_PUBLIC_BASE_URL

// Cookies udløber efter 1 time, ligesom accessToken fra API'et
// (js-cookie regner i dage, så 1/24 dag = 1 time)
const COOKIE_EXPIRES = 1 / 24

export function AuthProvider({ children }) {
    // Brugeren hentes fra cookien, så man stadig er logget ind efter genindlæsning
    const userCookie = Cookies.get('user')
    const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null)

    // Logger ind og gemmer tokens + bruger i cookies.
    // Går det galt, kastes en fejl, som formularen viser til brugeren.
    async function login(email, password) {
        const res = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password }),
        })

        if (res.status === 401) {
            throw new Error('Forkert email eller password')
        }
        if (!res.ok) {
            throw new Error('Noget gik galt. Prøv igen senere')
        }

        const data = await res.json()

        Cookies.set('accessToken', data.accessToken, { expires: COOKIE_EXPIRES })
        Cookies.set('refreshToken', data.refreshToken, { expires: COOKIE_EXPIRES })
        Cookies.set('user', JSON.stringify(data.user), { expires: COOKIE_EXPIRES })
        setUser(data.user)
    }

    // Logger ud hos API'et og rydder cookies
    async function logout() {
        try {
            await fetch(`${API_URL}/api/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: Cookies.get('refreshToken') }),
            })
        } finally {
            // finally kører altid, så cookies bliver ryddet, selv hvis API'et fejler
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            Cookies.remove('user')
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
