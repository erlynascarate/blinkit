import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./src/routes/userRoutes.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

// Configurar CORS para permitir peticiones desde GitHub Pages
app.use(cors({
    origin: '*'
}))

app.use(express.json())

// Ruta de verificación
app.get('/api', (req, res) => {
    res.json({ message: 'Backend is running!' })
})

app.use("/api", userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))