import axios from "axios"

const API_BASE = 'http://localhost:3000'

export type CartItemPayload = {
    productId: string
    quantity?: number
}

export const getCart = async (token: string) => {
    const response = await axios.get(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

export const addItemToCart = async (token: string, productId: string) => {
    const response = await axios.post(`${API_BASE}/cart/items`, { productId }, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}

export const updateCartItem = async (
    token: string,
    cartItemId: string,
    quantity: number
) => {
    const response = await axios.patch(
        `${API_BASE}/cart/items/${cartItemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
    )
    return response.data
}

export const removeCartItem = async (token: string, cartItemId: string) => {
    const response = await axios.delete(`${API_BASE}/cart/items/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
}