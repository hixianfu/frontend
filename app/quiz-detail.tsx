import { View, StyleSheet, BackHandler, Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Quiz, AnswerLog } from "@/types";
import { useSearchParams } from "expo-router/build/hooks";
import { Button, PaperProvider, Portal, ProgressBar, Text, Modal, Icon } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";
import ThemedContainer from "@/components/ThemedContainer";
import { fetchQuizList } from "@/apis/quiz";
import { createAnswerLog } from "@/apis/answer";
import { storeUserId } from "@/hooks/useSecureStore";

export default function QuizScreen() {
    const params = useSearchParams()
    const courseId = params.get('courseId')
    const [quizs, setQuizs] = useState<Quiz[]>([])
    const [page, setPage] = useState(0)
    const [userAnswer, setUserAnswer] = useState<string>('')
    const [visible, setVisible] = useState(false)
    const [correctVisible, setCorrectVisible] = useState(false)
    const [score, setScore] = useState(0)
    const pagerRef = useRef<PagerView>(null)

    const fetchQuizs = async () => {
        const response = await fetchQuizList(10, 'travel', Number(courseId))
        setQuizs(response)
    }

    const handleOptionPress = (option: string) => {
        setUserAnswer(option)
        if (option.slice(0, 1) === quizs[page].correct_answer) {
            setCorrectVisible(true)
        } else {
            setVisible(true)
        }
    }

    const handleNextQuiz = async (correct: boolean) => {

        const answer: Omit<AnswerLog, 'id'> = {
            userId: storeUserId(),
            questionId: quizs[page].id,
            courseId: Number(courseId),
            userAnswer,
            correctAnswer: quizs[page].options.find(option => option.slice(0, 1) === quizs[page].correct_answer) || '',
            isCorrect: correct ? '1' : '0'
        }
        await createAnswerLog(answer)

        if (correct) {
            setScore(score + 1)
        }
        if (page === quizs.length - 1) {
            router.push(`/result?score=${score}`)
        } else {
            setVisible(false)
            setCorrectVisible(false)
            pagerRef.current?.setPage(page + 1)
            setPage(page + 1)
        }
    }

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
            return true; // 阻止默认行为
        }

        BackHandler.addEventListener('hardwareBackPress', backAction)

        fetchQuizs()

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [])

    return (
        <PaperProvider>
            <Portal>
                <ThemedContainer style={{ padding: 20 }}>
                    <View>
                        <Text variant="bodyLarge">{page + 1}/{quizs.length}</Text>
                        <ProgressBar animatedValue={(page + 1) / quizs.length} color="#6750A4" style={{ height: 10, marginBottom: 10, borderRadius: 10 }} />
                    </View>
                    <PagerView ref={pagerRef} style={styles.container} initialPage={page} onPageSelected={(e) => setPage(e.nativeEvent.position)}>
                        {quizs.map(quiz => (
                            <View key={quiz.id} style={styles.quizContainer}>
                                <Text variant="headlineSmall">{quiz.question}</Text>
                                <View style={{ width: '100%' }}>
                                    {quiz.options.map((option, index) => (
                                        <Button key={index} mode="outlined" style={{ marginBottom: 10 }} compact={true} onPress={() => handleOptionPress(option)}>
                                            {option}
                                        </Button>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </PagerView>
                    <Modal dismissableBackButton={false} dismissable={false} visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300 }}>
                            <Icon source="close-circle" color='#FF5959' size={32} />
                            <Text variant="headlineSmall" style={{ color: '#FF5959', fontWeight: 'bold', marginLeft: 10 }}>差一点就对了！</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
                            <Text style={{ width: 90 }} variant="bodyLarge">正确答案：</Text>
                            <Text style={{ color: '#FF5959', fontWeight: 'bold' }} variant="headlineSmall">{quizs[page]?.correct_answer}</Text>
                        </View>
                        <Button mode="contained" onPress={() => handleNextQuiz(false)} style={{ backgroundColor: '#FF5959', borderRadius: 10 }}>
                            <Text variant="headlineSmall" style={{ color: 'white', fontWeight: 'bold' }}>{page === quizs.length - 1 ? '查看成绩' : '继续答题'}</Text>
                        </Button>
                    </Modal>
                    <Modal dismissableBackButton={false} dismissable={false} visible={correctVisible} onDismiss={() => setCorrectVisible(false)} contentContainerStyle={[styles.modal, { backgroundColor: '#E3F5FF' }]}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300 }}>
                            <Icon source="check-circle" color='#4699FD' size={32} />
                            <Text variant="headlineSmall" style={{ color: '#4699FD', fontWeight: 'bold', marginLeft: 10 }}>了不起！</Text>
                        </View>
                        <Button mode="contained" onPress={() => handleNextQuiz(true)} style={{ backgroundColor: '#459BFE', borderRadius: 10, marginTop: 16 }}>
                            <Text variant="headlineSmall" style={{ color: 'white', fontWeight: 'bold' }}>{page === quizs.length - 1 ? '查看成绩' : '继续答题'}</Text>
                        </Button>
                    </Modal>
                </ThemedContainer>
            </Portal>
        </PaperProvider >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    quizContainer: {
        padding: 20,
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    optionText: {
        fontSize: 16,
        color: '#6750A4',
    },
    modal: {
        padding: 30,
        backgroundColor: '#FEF3F1',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
})
