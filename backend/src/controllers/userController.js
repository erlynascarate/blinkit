import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const newUser = new User({ email, password })
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

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        res.status(200).json({ message: "Login successful", user })
    } catch (error) {
        console.error("Error logging in user:", error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}