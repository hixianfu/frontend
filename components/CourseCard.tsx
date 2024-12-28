import { Course } from "@/types";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, IconButton } from "react-native-paper";

interface CourseCardProps {
    course: Course,
    onPress?: () => void
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
    const { title, cover, description } = course

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: cover }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <View style={styles.levelContainer}>
                    <Text>{description}</Text>
                </View>
                <View style={styles.collectButton}>
                    <IconButton icon='bookmark-outline' iconColor="#fff" style={{ width: 24, height: 24 }} onPress={() => { }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '46%',
        height: 280,
    },
    image: {
        width: '100%',
        height: '90%'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    levelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        gap: 4,
        alignItems: 'center'
    },
    collectButton: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        top: 10,
        right: 10,
        borderRadius: 100,
    }
})