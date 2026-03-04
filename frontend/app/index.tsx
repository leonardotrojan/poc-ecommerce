import { AuthContext } from "../src/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

  const { token, isLoading } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }
    }
  }, [token, isLoading, router])

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
    )
}

