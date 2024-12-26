import ThemedContainer from '@/components/ThemedContainer';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';
import { fetchVocabularyList } from '@/apis/vocabulary';
import { Vocabulary } from '@/types';
import { router } from 'expo-router';

export default function TabIndexScreen() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])

  useEffect(() => {
    const fetchVocabulary = async () => {
      const vocabularies = await fetchVocabularyList()
      setVocabularies(vocabularies)
    }

    fetchVocabulary()
  }, [])

  return (
    <ThemedContainer style={{ padding: 20 }}>
      {vocabularies.map(vocabulary => (
        <Card key={vocabulary.id} onPress={() => router.push(`/detail?id=${vocabulary.id}`)}>
          <Card.Cover source={{ uri: vocabulary.cover }} />
          <Card.Title title={vocabulary.name} />
          <Card.Content>
            <View style={styles.content}>
              <Text variant="bodyMedium">{vocabulary.description}</Text>
              <Icon source="chevron-right" size={24} />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
  },
});
