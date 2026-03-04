import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { loginApi } from "../../services/loginApi";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setToken } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await loginApi.post('/auth/login', { email, password });
      setToken(res.data.access_token);
      console.log(res.data.access_token)
      router.replace('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro no login');
    } finally {
      setLoading(false);
    }
  }

    return ( 
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button
                 color={'#bb75fd'}
                 title={loading ? 'Carregando...' : 'Entrar'}
                 onPress={handleLogin} 
                 disabled={loading} 
                />
                <Text style={{ marginTop: 3, textAlign: 'center', }}>Novo aqui? 
                    <Text 
                        style={{ color: 'blue', textDecorationLine: 'underline', marginLeft: 6 }}
                        onPress={() => router.push('/sign-up')}
                    >
                    Cadastre-se agora
                    </Text>
                </Text>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f2f2f2'
    },
    form: {
        width: '80%',
        maxWidth: 500,
        padding: 80,
        borderRadius: 10,
        backgroundColor: '#e6e6e6',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10
    }
})
 
export default LoginForm;