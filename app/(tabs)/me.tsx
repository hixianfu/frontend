import ThemedContainer from '@/components/ThemedContainer';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function TabMeScreen() {
  return (
    <ThemedContainer style={{ padding: 20 }}>
      <Text variant="bodyLarge">测验</Text>
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
});
