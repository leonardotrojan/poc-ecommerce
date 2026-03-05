import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import ProductCard from "./products-card";
import { CartContext } from "@/src/context/CartContext";

type Product = {
    id: string
    name: string
    description: string
    price: string
}

export default function ProductsContainer() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const { token } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://poc-ecommerce-kca8.onrender.com/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProducts(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [token])

    const handleAddToCart = (product: Product) => {
        console.log("ADD ITEM", product.id)
        addToCart({ ...product, quantity: 1 })
    }

    if (loading) return <ActivityIndicator size="large" />

    return (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} onAddToCart={handleAddToCart} />}
          contentContainerStyle={{ padding: 16 }}
        />
    )
}