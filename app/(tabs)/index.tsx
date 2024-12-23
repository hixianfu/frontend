import { MonoText } from '@/components/StyledText';
import { getItemAsync } from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TabIndexScreen() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      const token = await getItemAsync('access_token')
      setToken(token ?? '')
    }

    getToken()
  }, [])

  return (
    <MonoText>
      { token }
    </MonoText> 
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
});
