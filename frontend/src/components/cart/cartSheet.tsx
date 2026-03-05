import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Modal, View, Text, FlatList, Button, StyleSheet } from "react-native";
import CartItemCard from "./cart-item-card";
import { AuthContext } from "../../context/AuthContext";
import { createOrder } from "../../services/orderApi";

export default function CartSheet() {
    const { 
        cartItems, 
        isCartOpen, 
        closeCart, 
        incrementQuantity,
        decrementQuantity,
        setCartItems,
        fetchCart,
        removeItem
    } = useContext(CartContext)

    const { token } = useContext(AuthContext)

    const total = cartItems.reduce((acc, item) => {
        return acc + Number(item.price) * item.quantity
    }, 0)

    const handleCheckout = async () => {
        if (!token) return

        try {
            await createOrder(token)

            alert("Pedido realizado com sucesso!")

            setCartItems([])

            fetchCart()
        } catch (error) {
            console.log("Erro no checkout:", error)
        }
    }

    return (
        <Modal
          visible={isCartOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={closeCart}
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    <Text style={styles.title}>Meu carrinho</Text>

                    {cartItems.length === 0 ? (
                        <Text style= {{ textAlign: 'center' }}>O carrinho está vazio.</Text>
                    ) : (
                        <FlatList
                          data={cartItems}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                            <CartItemCard 
                              item={item}
                              incrementQuantity={incrementQuantity}
                              decrementQuantity={decrementQuantity}
                              removeItem={removeItem}
                            />
                          )}
                        />
                    )}
                    <Text style={styles.total}>
                        Total: R$ {total.toFixed(2)}
                    </Text>
                    {cartItems.length > 0 && (
                        <Button title="Finalizar compra" onPress={handleCheckout} />
                    )}
                    <View style={{ marginTop: 4 }}>
                        <Button title="Fechar" onPress={closeCart} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 250,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    },
    item: {
        marginBottom: 8,
    }
})