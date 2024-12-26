import { useEffect, useRef } from "react";
import { IconButton, Text, Snackbar, Button } from "react-native-paper";
import PagerView from 'react-native-pager-view';
import { View, StyleSheet, ToastAndroid, ScrollView } from "react-native";
import { useState } from "react";
import { Audio } from "expo-av";
import Collapsible from "react-native-collapsible";
import { Word } from "@/types";
import { fetchDailyWords, audioUrl, updateWordProgress } from "@/apis/word";
import ThemedContainer from "@/components/ThemedContainer";
import { WordProgressStatus } from "@/apis/types";

type WordWithAudio = Word & {
    audio_us: string;
    audio_uk: string;
}
export default function DetailScreen() {
    const pagerRef = useRef<PagerView>(null);
    const [words, setWords] = useState<WordWithAudio[]>([]);
    const [page, setPage] = useState(0);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [sampleExpanded, setSampleExpanded] = useState(false);
    const [phraseExpanded, setPhraseExpanded] = useState(false);

    useEffect(() => {
        setSnackbarVisible(true);
        fetchDailyWords().then(words => {
            setWords(words.map(word => ({
                ...word,
                audio_us: audioUrl(0, word.cet4_word),
                audio_uk: audioUrl(1, word.cet4_word)
            })));
        });
    }, []);

    async function playSound(type: 'us' | 'uk') {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: words[page !== 0 ? page - 1 : page][`audio_${type}`],
            }
        );

        try {
            await sound.playAsync();
        } catch (error) {
            ToastAndroid.show('播放失败,请稍后再试', ToastAndroid.SHORT);
        }
    }

    const handleUpdateWordProgress = async (wordId: number, status: WordProgressStatus) => {
        await updateWordProgress(wordId, status);
        pagerRef.current?.setPage(page);
        setPage(page + 1);
    }

    const handlePageScroll = (e: { nativeEvent: { position: number } }) => {
        setSampleExpanded(true);
        setPhraseExpanded(true);
    }

    return (
        <ThemedContainer style={{ padding: 20 }}>
            <PagerView style={styles.container} initialPage={page} ref={pagerRef} onPageScroll={handlePageScroll} onPageSelected={(e) => {
                setPage(e.nativeEvent.position + 1);
            }}>
                {words.map(word => {
                    return (
                        <View style={styles.page} key={word.id}>
                            <Text variant="headlineMedium">{word.cet4_word}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 0 }}>
                                <Text variant="bodyLarge">{word.cet4_phonetic.split('美')[0]}</Text>
                                <IconButton icon="volume-high" size={24} onPress={() => playSound('uk')} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text variant="bodyLarge">美{word.cet4_phonetic.split('美')[1]}</Text>
                                <IconButton icon="volume-high" size={24} onPress={() => playSound('us')} />
                            </View>
                            <Text variant="bodyLarge">{word.cet4_translate}</Text>
                            <Text variant="bodyLarge">{word.cet4_distortion}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Text variant="bodyLarge">短语</Text>
                                <IconButton icon="chevron-down" size={24} onPress={() => setPhraseExpanded(!phraseExpanded)} />
                            </View>
                            <Collapsible collapsed={phraseExpanded} align="top">
                                <ScrollView style={{ height: 150, width: 300 }}>
                                    <Text variant="bodyLarge">
                                        {word.cet4_phrase}
                                    </Text>
                                </ScrollView>
                            </Collapsible>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Text variant="bodyLarge">例句</Text>
                                <IconButton icon="chevron-down" size={24} onPress={() => setSampleExpanded(!sampleExpanded)} />
                            </View>
                            <Collapsible collapsed={sampleExpanded} align="top">
                                <ScrollView style={{ height: 150, width: 300 }}>
                                    <Text variant="bodyLarge">
                                        {word.cet4_samples}
                                    </Text>
                                </ScrollView>
                            </Collapsible>

                            <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1000 }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 30 }}>
                                    <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(word.id, WordProgressStatus.FORGET)}>
                                        <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                            忘记
                                        </Text>
                                    </Button>
                                    <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(word.id, WordProgressStatus.FAMILIAR)}>
                                        <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                            熟悉
                                        </Text>
                                    </Button>
                                    <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(word.id, WordProgressStatus.LEARNED)}>
                                        <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                            已学会
                                        </Text>
                                    </Button>
                                </View>
                                <Text variant="bodyLarge" style={{ position: 'absolute', bottom: 0, right: '46%', zIndex: 1000 }}>
                                    {page}/{words.length}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </PagerView>

            <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} action={{
                label: 'GOT IT',
            }}>
                左右滑动查看单词
            </Snackbar>
        </ThemedContainer >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 4,
        alignContent: 'flex-start',
        backgroundColor: '#fff',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
    },
    fixedPagination: {
        position: 'absolute',
        bottom: 0,
        right: '46%',
        zIndex: 1000,
    }
});
