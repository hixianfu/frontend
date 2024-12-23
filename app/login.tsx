import { useState } from "react";
import { StyleSheet, Image, View, ToastAndroid } from "react-native";
import { Button, Text, TextInput, Checkbox } from "react-native-paper";
import { login } from "@/apis/user";
import { useRouter } from "expo-router";
import { setItemAsync } from "expo-secure-store";

export default function LoginScreen() {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isAgree, setIsAgree] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!username || !password) {
            ToastAndroid.show('请输入用户名和密码', ToastAndroid.SHORT)
            return
        }

        ToastAndroid.show('登录中...', ToastAndroid.SHORT)

        try {
            const { access_token} = await login({
                username,
                password
            })

            console.log(access_token, 'data')

            if(access_token) {
                ToastAndroid.show('登录成功', ToastAndroid.SHORT)
                await setItemAsync('access_token', access_token)
                router.push('/(tabs)')
            }

        } catch (error) {
            ToastAndroid.show('登录失败', ToastAndroid.SHORT)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/login_bg.png')} style={styles.bg} />
            <View style={styles.form}>
                <TextInput label="用户名" mode="outlined"
                    value={username} style={styles.input}
                    onChangeText={text => setName(text)} />
                <TextInput label="密码" mode="outlined"
                    value={password} style={styles.input}
                    onChangeText={text => setPassword(text)} />
                <Button mode="contained" style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>登录</Text>
                </Button>
                <View style={styles.footer}>
                    <View style={styles.footerLinks}>
                        <Text style={styles.footerLink}>注册</Text>
                        <Text style={styles.footerLink}>忘记密码？</Text>
                    </View>
                    <View style={styles.footerCheckbox}>
                        <Checkbox
                            status={isAgree ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setIsAgree(!isAgree);
                            }}
                            theme={{
                                roundness: 100
                            }}
                        />
                        <Text style={styles.footerLink}>我已阅读并同意
                            <Text style={styles.footerLinkBlue}>《用户协议》</Text>
                            <Text style={styles.footerLinkBlue}>《隐私政策》</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    bg: {
        width: '100%',
        height: 400
    },
    form: {
        padding: 20,
        borderRadius: 10,
        marginTop: -100,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 4,
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
    },
    footer: {
        justifyContent: 'space-between',
        color: '#919AA6',
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#919AA6',
    },
    footerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        color: '#919AA6',
    },
    footerLink: {
        color: '#919AA6',
    },
    footerLinkBlue: {
        color: '#4198FF',
    }
})
