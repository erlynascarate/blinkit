import { useState, useEffect } from "react"

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Cargar el usuario desde localStorage al iniciar
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error("Error parsing user from localStorage:", error)
                localStorage.removeItem("user")
            }
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return { user, loading, login, logout, isAuthenticated: !!user }
}

export default useAuth
