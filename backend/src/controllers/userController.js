import User from "../models/User"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Aquí podrías agregar validaciones adicionales, como verificar si el correo ya existe

        const newUser = new User({ name, email, password })
        await newUser.save()

        res.status(201).json({ message: "User registered successfully", user: newUser })
    } catch (error) {
        console.error("Error registering user:", error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Aquí deberías comparar la contraseña con la almacenada (usando bcrypt, por ejemplo)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.error("Error logging in user:", error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}