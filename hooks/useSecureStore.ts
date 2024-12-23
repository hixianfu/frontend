import { setItemAsync, getItemAsync } from 'expo-secure-store';

export const useSecureStore = () => {
    const setItem = async (key: string, value: string) => {
        await setItemAsync(key, JSON.stringify(value))
    }

    const getItem = async (key: string) => {
        return await getItemAsync(key)
    }

    return { setItem, getItem }
}
    
