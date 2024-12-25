import ThemedContainer from '@/components/ThemedContainer';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
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
    <ThemedContainer>
      {vocabularies.map(vocabulary => (
        <Card key={vocabulary.id} onPress={() => router.push(`/detail?id=${vocabulary.id}`)}>
          <Card.Cover source={{ uri: vocabulary.cover }} />
          <Card.Title title={vocabulary.name} />
          <Card.Content>
            <Text variant="bodyMedium">{vocabulary.description}</Text>
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
});
