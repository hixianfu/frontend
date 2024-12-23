import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface ThemedCellProps {
    title: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

const ThemedCell = ({ title, icon, onPress }: ThemedCellProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text>{title}</Text>
            {icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ThemedCell;
