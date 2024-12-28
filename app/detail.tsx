import { useEffect, useMemo, useRef } from "react";
import { IconButton, Text, Snackbar, Button, ProgressBar, PaperProvider, Modal, Portal } from "react-native-paper";
import PagerView from 'react-native-pager-view';
import { View, StyleSheet, ToastAndroid, ScrollView, Alert, BackHandler } from "react-native";
import { useState } from "react";
import { Audio } from "expo-av";
import Collapsible from "react-native-collapsible";
import { router } from "expo-router";
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
    const [completeModalVisible, setCompleteModalVisible] = useState(false);

    const progress = useMemo(() => {
        if (words.length === 0) return 0;

        const progress = (page / words.length).toFixed(2);
        return parseFloat(progress);
    }, [page, words]);

    useEffect(() => {
        const backAction = () => {
            Alert.alert("太可惜了~", "真的要放弃吗", [
                {
                    text: "继续",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "离开", onPress: () => router.back() }
            ]);
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', backAction)

        setSnackbarVisible(true);
        fetchDailyWords().then(words => {
            setWords(words.map(word => ({
                ...word,
                audio_us: audioUrl(0, word.cet4_word),
                audio_uk: audioUrl(1, word.cet4_word)
            })));
        });

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, []);

    // 播放单词音频
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

    // 更新单词进度
    const handleUpdateWordProgress = async (status: WordProgressStatus) => {
        await updateWordProgress(words[page - 1].id, status);
        if (page === words.length) {
            setCompleteModalVisible(true)
        } else {
            pagerRef.current?.setPage(page);
            setPage(page + 1);
        }
    }

    // 翻页
    const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
        setPage(e.nativeEvent.position + 1);
        setSampleExpanded(true);
        setPhraseExpanded(true);
    }

    // 重新挑战
    const handleRestart = () => {
        pagerRef.current?.setPage(0)
        setCompleteModalVisible(false)
    }

    return (
        <PaperProvider>
            <Portal>
                <ThemedContainer style={{ padding: 20, position: 'relative' }}>
                    <View>
                        <Text variant="bodyLarge">{page}/{words.length}</Text>
                        <ProgressBar animatedValue={progress} color="#6750A4" style={{ height: 10, marginBottom: 10, borderRadius: 10 }} />
                    </View>

                    <PagerView style={styles.container} initialPage={page} ref={pagerRef} onPageSelected={handlePageSelected}>
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
                                        <IconButton icon={phraseExpanded ? 'chevron-up' : 'chevron-down'} size={24} onPress={() => setPhraseExpanded(!phraseExpanded)} />
                                    </View>
                                    <Collapsible collapsed={phraseExpanded} align="top">
                                        <ScrollView style={{ height: 100, width: 300 }}>
                                            <Text variant="bodyLarge">
                                                {word.cet4_phrase}
                                            </Text>
                                        </ScrollView>
                                    </Collapsible>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <Text variant="bodyLarge">例句</Text>
                                        <IconButton icon={sampleExpanded ? 'chevron-up' : 'chevron-down'} size={24} onPress={() => setSampleExpanded(!sampleExpanded)} />
                                    </View>
                                    <Collapsible collapsed={sampleExpanded} align="top">
                                        <ScrollView style={{ height: 100, width: 300 }}>
                                            <Text variant="bodyLarge">
                                                {word.cet4_samples}
                                            </Text>
                                        </ScrollView>
                                    </Collapsible>
                                </View>
                            )
                        })}
                    </PagerView>


                    <View style={styles.buttons}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 30 }}>
                            <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(WordProgressStatus.FORGET)}>
                                <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                    忘记
                                </Text>
                            </Button>
                            <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(WordProgressStatus.FAMILIAR)}>
                                <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                    熟悉
                                </Text>
                            </Button>
                            <Button style={{ width: '30%' }} mode="contained" onPress={() => handleUpdateWordProgress(WordProgressStatus.LEARNED)}>
                                <Text variant="bodyLarge" style={{ color: '#fff' }}>
                                    已学会
                                </Text>
                            </Button>
                        </View>
                    </View>
                    <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} action={{
                        label: 'GOT IT',
                    }}>
                        左右滑动查看单词
                    </Snackbar>

                </ThemedContainer >
                <Modal visible={completeModalVisible} dismissable={false} contentContainerStyle={styles.completeModal}>
                    <View>
                        <Text variant="bodyLarge" style={{ textAlign: 'center', marginBottom: 16 }}>恭喜你，已经完成今天的学习任务！</Text>
                        <Button mode="contained" onPress={handleRestart}>
                            <Text style={{ color: 'white' }}>重新挑战</Text>
                        </Button>
                        <Button mode="text" onPress={() => setCompleteModalVisible(false)}>
                            <Text>返回主页</Text>
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 4,
        alignContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff',
    },
    page: {
        flex: 1,
        paddingBottom: 150,
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        left: 10
    },
    completeModal: {
        padding: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});
