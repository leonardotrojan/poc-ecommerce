import { ReactNode, createContext, useState } from "react"
import type { CartItem } from "../types/cart-item"

type CartContextType = {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    removeItem: (id: string) => void
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    isCartOpen: false,
    openCart: () => {},
    closeCart: () => {},
    incrementQuantity: (id) => {},
    decrementQuantity: (id) => {},
    removeItem: (id) => {}
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                )
            } else {
                return [...prev, item]
            }
        })
        setIsCartOpen(true)
    }

    const openCart = () => {
        console.log('abrindo cart')
        setIsCartOpen(true)
        console.log('cart aberto')
    }
    const closeCart = () => setIsCartOpen(false)

    const incrementQuantity = (id: string) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    const decrementQuantity = (id: string) => {
        setCartItems(prev => 
            prev
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        )
    }

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    return (
        <CartContext.Provider
          value={{ cartItems, addToCart, isCartOpen, openCart, closeCart, incrementQuantity, decrementQuantity, removeItem }}
        >
            {children}
        </CartContext.Provider>
    )
}