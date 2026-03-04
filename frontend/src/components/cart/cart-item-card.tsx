import { Button, StyleSheet, Text, View } from "react-native"
import type { CartItem } from "@/src/types/cart-item"

type Props = {
    item: CartItem
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    removeItem: (id: string) => void
}

export default function CartItemCard({ item, incrementQuantity, decrementQuantity, removeItem }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>R$ {item.price} x {item.quantity}</Text>
            </View>

            <View style={styles.buttons}>
                <Button title="+" onPress={() => incrementQuantity(item.id)} />
                <Button title="-" onPress={() => decrementQuantity(item.id)} />
                <Button title="x" color={'#ff6262'} onPress={() => removeItem(item.id)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#b9b9b9",
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    info: {
        marginBottom: 8,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    price: {
        marginTop: 4,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
})