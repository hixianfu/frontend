import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-paper";

const TabBarHeaderRight = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Button onPress={() => {}}>
                <Icon source="bell-off-outline" size={28} color="#000" />
            </Button>
            <Button onPress={
                () => router.push('/account')
            }>
                <Icon source="account" size={32} color="#000" />
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginRight: 15
    }
})

export default TabBarHeaderRight;
