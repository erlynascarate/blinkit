import { create } from "zustand"

const getInitialUser = () => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) return null

    try {
        return JSON.parse(storedUser)
    } catch (error) {
        console.error("Error parsing user from localStorage:", error)
        localStorage.removeItem("user")
        return null
    }
}

const initialUser = getInitialUser()

const useAuth = create((set) => ({
    user: initialUser,
    loading: false,
    login: (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        set({ user: userData })
    },
    logout: () => {
        localStorage.removeItem("user")
        set({ user: null })
    },
}))

export default useAuth
