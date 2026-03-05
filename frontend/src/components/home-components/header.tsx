import { View, Text, Button } from "react-native"
import { useContext } from "react"
import { CartContext } from "@/src/context/CartContext"
import { AuthContext } from "@/src/context/AuthContext"

export default function Header() {

  const { openCart } = useContext(CartContext)
  const { logout } = useContext(AuthContext)

  return (
    <View style={{ padding: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 20 }}>Loja</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '50%' }}>
          <Button title="logout" onPress={logout}/>
          <Button title="Carrinho" onPress={openCart} />
      </View>
    </View>
  )
}