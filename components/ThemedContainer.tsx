import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";


export interface Props {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}


export default function ThemedContainer({ children, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
});
