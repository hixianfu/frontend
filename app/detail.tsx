import ThemedContainer from "@/components/ThemedContainer";
import { IconButton, Text } from "react-native-paper";
import PagerView from 'react-native-pager-view';
import { View, StyleSheet, ToastAndroid } from "react-native";
import { fetchDailyWords, audioUrl } from "@/apis/word";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Audio } from "expo-av";
import { Word } from "@/types";

type WordWithAudio = Word & {
    audio: string;
}
export default function DetailScreen() {
    const pagerRef = useRef<PagerView>(null);
    const [words, setWords] = useState<WordWithAudio[]>([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        fetchDailyWords().then(words => {
            setWords(words.map(word => ({
                ...word,
                audio: audioUrl(0, word.cet4_word)
            })));
        });
    }, []);

    const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
        setPage(e.nativeEvent.position + 1);
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: words[page !== 0 ? page -1 : page].audio,
            }
        );

        try {
            await sound.playAsync();
        } catch (error) {
            ToastAndroid.show('播放失败,请稍后再试', ToastAndroid.SHORT);
        }
    }

    return (
        <ThemedContainer>
            <Text variant="bodyLarge">左右滑动查看单词</Text>
            <PagerView style={styles.container} initialPage={0} ref={pagerRef} onPageSelected={handlePageSelected}>
                {words.map(word => {
                    return (
                        <View style={styles.page} key={word.id}>
                            <Text variant="headlineMedium">{word.cet4_word}</Text>
                            <Text variant="bodyLarge">{word.cet4_phonetic}</Text>
                            <Text variant="bodyLarge">{word.cet4_translate}</Text>
                            <Text variant="bodyLarge">{word.cet4_distortion}</Text>
                            <IconButton icon="volume-high" size={24} onPress={playSound} />
                        </View>
                    )
                })}
            </PagerView>
        </ThemedContainer >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
    },
});
