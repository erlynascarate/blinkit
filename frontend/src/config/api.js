// Configuración de la URL base del API
export const API_URL = import.meta.env.VITE_API_URL || '/api'

// Helper para hacer peticiones
export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    return response
}
