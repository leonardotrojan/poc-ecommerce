import axios from "axios"

const API_URL = "http://localhost:3000"

export const createOrder = async (token: string) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Erro ao criar pedido")
    }

    return response.json()
}

export const getOrders = async (token: string) => {
    const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response.data
}