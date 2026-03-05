import { ReactNode, createContext, useContext, useState } from "react"
import type { CartItem } from "../types/cart-item"
import { addItemToCart, getCart, updateCartItem, removeCartItem } from "../services/cartApi"
import { AuthContext } from "./AuthContext"

type CartContextType = {
    cartItems: CartItem[]
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    addToCart: (item: CartItem) => void
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    fetchCart: () => void
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    removeItem: (id: string) => void
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    setCartItems: () => {},
    addToCart: () => {},
    isCartOpen: false,
    openCart: () => {},
    closeCart: () => {},
    fetchCart: () => {},
    incrementQuantity: (id) => {},
    decrementQuantity: (id) => {},
    removeItem: (id) => {}
})

export const CartProvider = ({ children }: { children: ReactNode }) => {

    console.log("Cartprovider render")

    const {token} = useContext(AuthContext)

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const fetchCart = async () => {
        if (!token) return

        try {
            const data = await getCart(token)
            setCartItems(data.items)
        } catch (error) {
            console.log("Erro ao buscar carrinho:", error)
        }
    }

    const addToCart = async (item: CartItem) => {
    if (!token) return

    try {
        await addItemToCart(token, item.id)
        console.log("ADD CART", item.id)
        await fetchCart()
        setIsCartOpen(true)
    } catch (error) {
        console.log("Erro ao adicionar item:", error)
    }
}

    const openCart = () => {
        setIsCartOpen(true)
    }
    const closeCart = () => setIsCartOpen(false)

    const incrementQuantity = async (id: string) => {
    if (!token) return

    const item = cartItems.find(i => i.id === id)
    if (!item) return

    await updateCartItem(token, id, item.quantity + 1)
    fetchCart()
}

    const decrementQuantity = async (id: string) => {
    if (!token) return

    const item = cartItems.find(i => i.id === id)
    if (!item) return

    if (item.quantity === 1) {
        await removeCartItem(token, id)
    } else {
        await updateCartItem(token, id, item.quantity - 1)
    }

    fetchCart()
}

    const removeItem = async (id: string) => {
    if (!token) return

    await removeCartItem(token, id)
    fetchCart()
}


    return (
        <CartContext.Provider
          value={{ cartItems, setCartItems, addToCart, fetchCart, isCartOpen, openCart, closeCart, incrementQuantity, decrementQuantity, removeItem }}
        >
            {children}
        </CartContext.Provider>
    )
}