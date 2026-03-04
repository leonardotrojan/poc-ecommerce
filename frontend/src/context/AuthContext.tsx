import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type AuthContextType = {
    token: string | null;
    setToken: (token: string) => |Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: async () => {},
    logout: async () => {},
    isLoading: true
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if(storedToken) {
                    setTokenState(storedToken)
                }
            } catch (error) {
                console.error('Erro ao carregar token', error)
            } finally {
                setIsLoading(false)
            }
        } 
        loadToken();
    }, [])

    const setToken = async (newToken: string ) => {
        try {
            await AsyncStorage.setItem('token', newToken)
            setTokenState(newToken)
        } catch (error) {
            console.error('Erro ao salvar token', error)
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            setTokenState(null)
            router.replace('/')
        } catch (error) {
            console.error('Erro ao remover token', error)
        }
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}