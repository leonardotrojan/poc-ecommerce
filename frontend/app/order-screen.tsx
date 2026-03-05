import { AuthContext } from "@/src/context/AuthContext";
import { getOrders } from "@/src/services/orderApi";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import type { Order } from '../src/types/orders'
import { useRouter } from "expo-router";

export default function OrdersScreen() {
    const { token } = useContext(AuthContext)
    const [orders, setOrders] = useState<Order[]>([])

    const router = useRouter()

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return

            const data = await getOrders(token)
            setOrders(data)
        }

        fetchOrders()
    }, [])

    const formatPrice = (value: number | string) => {
        return `R$ ${Number(value).toFixed(2)}`
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    }

    const backToHome = () => {
        router.replace('/')
    }

    return (
        <View>
            <View style={{ height: 60, paddingTop: 20, backgroundColor: '#1d97fc' }}>
              <Button title="voltar" onPress={backToHome} />
            </View>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
            
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Pedido #{item.id.slice(0, 8)}</Text>
                        <Text style={styles.orderStatus}>{item.status}</Text>
                    </View>
                    <Text style={styles.orderDate}>
                        {formatDate(item.createdAt)}
                    </Text>
                    <View style={styles.itemsContainer}>
                        {item.items.map((i) => (
                        <View key={i.id} style={styles.itemRow}>
                            <Text style={styles.itemName}>
                            {i.product.name}
                            </Text>
                            <Text style={styles.itemQty}>
                            x{i.quantity}
                            </Text>
                            <Text style={styles.itemPrice}>
                            {formatPrice(i.priceAtPurchase)}
                            </Text>
                        </View>
                        ))}
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>
                        {formatPrice(item.total)}
                        </Text>
                    </View>
                    </View>
                )}
                />
        </View>
    )
}

const styles = StyleSheet.create({

  orderCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },

  orderId: {
    fontWeight: "bold",
    fontSize: 16
  },

  orderStatus: {
    fontWeight: "600",
    color: "green"
  },

  orderDate: {
    color: "#666",
    marginBottom: 12
  },

  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },

  itemName: {
    flex: 1
  },

  itemQty: {
    marginHorizontal: 8
  },

  itemPrice: {
    fontWeight: "500"
  },

  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  totalLabel: {
    fontWeight: "bold"
  },

  totalValue: {
    fontWeight: "bold",
    fontSize: 16
  }

})