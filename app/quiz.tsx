import { View, StyleSheet } from "react-native";
import { fetchQuizList } from "@/apis/quiz";
import { useEffect, useState, useRef } from "react";
import { Quiz } from "@/types";
import { useSearchParams } from "expo-router/build/hooks";
import PagerView from "react-native-pager-view";
import ThemedContainer from "@/components/ThemedContainer";
import { Button, Drawer, ProgressBar, Text } from "react-native-paper";

export default function QuizScreen() {
    const params = useSearchParams()
    const courseId = params.get('courseId')
    const [quizs, setQuizs] = useState<Quiz[]>([])
    const [page, setPage] = useState(0)
    const pagerRef = useRef<PagerView>(null)

    const fetchQuizs = async () => {
        const response = await fetchQuizList(10, 'travel', Number(courseId))
        setQuizs(response)
    }

    const handleOptionPress = (option: string) => {
        if (option.slice(0, 1) === quizs[page].correct_answer) {
            pagerRef.current?.setPage(page + 1)
            setPage(page + 1)
        }
    }

    useEffect(() => {
        fetchQuizs()
    }, [])

    return (
        <ThemedContainer style={{ padding: 20 }}>
            <View>
                <Text variant="bodyLarge">{page + 1}/{quizs.length}</Text>
                <ProgressBar animatedValue={page / quizs.length} color="#6750A4" style={{ height: 10, marginBottom: 10, borderRadius: 10 }} />
            </View>
            <PagerView ref={pagerRef} style={styles.container} initialPage={page} onPageSelected={(e) => setPage(e.nativeEvent.position)}>
                {quizs.map(quiz => (
                    <View key={quiz.id}>
                        <Text variant="headlineSmall">{quiz.question}</Text>
                        {quiz.options.map((option, index) => (
                            <Button key={index} mode="outlined" style={{ marginBottom: 10 }} compact={true} onPress={() => handleOptionPress(option)}>
                                {option}
                            </Button>
                        ))}
                    </View>
                ))}
            </PagerView>
            <Drawer.Item
                icon="menu"
                label="Menu"
                onPress={() => {}}
            />
        </ThemedContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#6750A4',
    }
})
