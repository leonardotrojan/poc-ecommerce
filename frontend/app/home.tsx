import ProductsContainer from "@/src/components/products-components/products-container";
import Header from "../src/components/home-components/header";
import { View } from "react-native";
import CartSheet from "../src/components/cart/cartSheet";

const HomeScreen = () => {    
    return ( 
            <View style={{ flex: 1 }}>
                <Header />
                <ProductsContainer />
                <CartSheet />
            </View>
     );
}
 
export default HomeScreen;