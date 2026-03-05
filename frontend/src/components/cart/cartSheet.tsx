import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Modal, View, Text, FlatList, Button, StyleSheet } from "react-native";
import CartItemCard from "./cart-item-card";

export default function CartSheet() {
    const { 
        cartItems, 
        isCartOpen, 
        closeCart, 
        incrementQuantity,
        decrementQuantity,
        removeItem
    } = useContext(CartContext)

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

                    <Button title="Fechar" onPress={closeCart} />
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
    item: {
        marginBottom: 8,
    }
})