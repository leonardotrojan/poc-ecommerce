import { AuthContext } from "@/src/context/AuthContext";
import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";

const Header = () => {

    const { logout } = useContext(AuthContext)

    return ( 
        <View style={styles.container}>
            <View style ={{ width: '40%' }}>
                <Button
                 title="sair"
                 onPress={logout}
                 color={'#ff6262'}
                />
            </View>
            <View style={{ flexDirection: 'row', display: 'flex', width: '50%', justifyContent: 'space-evenly' }}>
                <View style={{ width: '40%' }}>
                    <Button 
                    title="carrinho"
                    />
                </View>
                <View style={{ width: '40%' }}>
                    <Button 
                    title="histórico"
                    />
                </View>
            </View>
        </View>
     );
}

const styles: any = StyleSheet.create({
    container: {
        width: '100%', 
        height: 44, 
        padding: 2, 
        borderWidth: 2, 
        borderColor: '#b9b9b9', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
})
 
export default Header;