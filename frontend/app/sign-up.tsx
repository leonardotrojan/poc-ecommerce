import SignUpForm from "../src/components/auth-components/signupForm";
import { View } from "react-native";

const SignUpScreen = () => {
    return ( 
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <SignUpForm />
        </View>
     );
}
 
export default SignUpScreen;