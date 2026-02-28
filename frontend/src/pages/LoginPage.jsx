import Login from "./Login"
import { apiRequest } from "../config/api"

const LoginPage = () => {
    const handleLogin = async (data) => {
        const response = await apiRequest("/login", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Login failed")
        }

        // Guardar el token o datos del usuario
        localStorage.setItem("user", JSON.stringify(result.user || { email: data.email }))

        return result
    }

    return (
        <Login 
            onSubmit={handleLogin}
        />
    )
}

export default LoginPage
