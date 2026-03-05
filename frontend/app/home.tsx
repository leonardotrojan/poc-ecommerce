import ProductsContainer from "@/src/components/products-components/products-container";
import Header from "../src/components/home-components/header";
import { View } from "react-native";

const HomeScreen = () => {    
    return ( 
            <View style={{ flex: 1 }}>
                < Header />
                <ProductsContainer />
            </View>
     );
}
 
export default HomeScreen;