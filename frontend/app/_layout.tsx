import CartSheet from "@/src/components/cart/cartSheet";
import { AuthProvider } from "@/src/context/AuthContext";
import { CartProvider } from "@/src/context/CartContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <CartSheet />
      </CartProvider>
    </AuthProvider>
  )
}
