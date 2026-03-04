import { useContext, useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { registerApi } from "../services/registerApi";

const SignUpForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { setToken } = useContext(AuthContext)
    const router = useRouter()

    const handleSignUp = async () => {
        setError('')

        if (!name || !email || !password || !confirmPassword) {
            setError('Preencha todos os campos.')
            return
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        setLoading(true)
        try {
            const res = await registerApi.post('/users', {
                name,
                email,
                password
            })
            setToken(res.data.access_token)
            router.replace('/')
        } catch (error: any) {
            setError(error.response?.data?.message || 'Erro ao cadastrar')
        } finally {
            setLoading(false)
        }
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    />
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
                <TextInput
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                    disabled={loading}
                >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                )}
                </TouchableOpacity>

                <Text style={{ marginTop: 10, textAlign: 'center' }}>
                    Já tem conta?{' '}
                <Text 
                    style={{ color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => router.push('/login')}
                >
                    Faça login
                </Text>
                </Text>
            </View>
        </View>
     );
}
 
export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '85%',
    maxWidth: 500,
    padding: 30,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  input: {
    width: '75%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#bb75fd',
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    width: '75%',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  }
});