import Login from "./Login"
import { apiRequest } from "../config/api"

const Register = () => {
    const handleRegister = async (data) => {
        const response = await apiRequest("/register", {
            method: "POST",
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Registration failed")
        }

        return result
    }

    return (
        <Login 
            title="Create account"
            buttonText="Sign up"
            linkText="Log in"
            linkTo="/login"
            linkPrefix="Already have an account? "
            onSubmit={handleRegister}
        />
    )
}

export default Register
