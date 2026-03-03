import Login from "./Login"
import { apiRequest } from "../config/api"
import useAuthStore from "../store/authStore"

const LoginPage = () => {
    const { login } = useAuthStore()

    const handleLogin = async (data) => {
        const response = await apiRequest("/login", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Login failed")
        }

        login(result.user || { email: data.email })

        return result
    }

    return (
        <Login 
            onSubmit={handleLogin}
        />
    )
}

export default LoginPage
