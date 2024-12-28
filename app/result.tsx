import { Video } from "expo-av";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Text } from "react-native-paper";

export default function ResultScreen() {
    const params = useSearchParams()
    const score = params.get('score')

    return (
        <View>
            <View style={styles.container}>
                <Text variant="headlineMedium" style={styles.title}>完成测验</Text>

                <View>
                    <View>
                        <View style={styles.cell}>
                            <Text variant="titleLarge" style={styles.cellText}>获得积分</Text>
                            <View style={styles.scoreContainer}>
                                <Icon source='star' size={28} color='#F7BA53' />
                                <Text variant="titleLarge" style={[styles.cellText, { color: '#F7BA53' }]}>{score}</Text>
                            </View>
                        </View>

                    </View>
                    <View>
                        <View style={styles.cell}>
                            <Text variant="titleLarge" style={styles.cellText}>正确率</Text>
                            <View style={styles.scoreContainer}>
                                <Icon source='check-circle' size={28} color='#4699FF' />
                                <Text variant="titleLarge" style={styles.cellText}>{(parseInt(score ?? '0') / 10) * 100}%</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
            <Button mode="contained" style={styles.button} onPress={() => router.push('/me')}>
                <Text variant="titleLarge" style={styles.buttonText}>继续</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        paddingTop: 48,
        paddingBottom: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#9A57FF',
        color: 'white'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    },
    cell: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
        padding: 16,
        paddingRight: 20,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cellText: {
        fontWeight: 'bold'
    },
    scoreContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#9A58FF',
        borderRadius: 10,
        padding: 4,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }

})

