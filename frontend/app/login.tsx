import LoginForm from "@/src/components/loginForm";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {

    return (
        <View style={styles.container}>
            <LoginForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})