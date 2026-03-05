import { View, Text, Button } from "react-native"
import { useContext } from "react"
import { CartContext } from "@/src/context/CartContext"
import { AuthContext } from "@/src/context/AuthContext"
import { useRouter } from "expo-router"

export default function Header() {

  const { openCart } = useContext(CartContext)
  const { logout } = useContext(AuthContext)

  const router = useRouter()

  const redirectToHistory = () => {
    router.replace('/order-screen')
  }

  return (
    <View style={{ padding: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 20 }}>Loja</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' }}>
          <Button title="histórico" onPress={redirectToHistory} />
          <Button title="logout" onPress={logout} color={'#ff5454'}/>
          <Button title="Carrinho" onPress={openCart} color={'#880aff'} />
      </View>
    </View>
  )
}