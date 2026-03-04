import { AuthContext } from "@/src/context/AuthContext";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

const HomeScreen = () => {
    const { logout } = useContext(AuthContext) 
    
    return ( 
        <View>
            <Text>home</Text>
            <Button title="logout" onPress={logout} />
        </View>
     );
}
 
export default HomeScreen;