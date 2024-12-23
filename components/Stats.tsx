import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface StatsProps {
    title: string | React.ReactNode;
    value: number;
    style?: StyleProp<ViewStyle>;
}

const Stats = ({ title, value, style }: StatsProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Stats;