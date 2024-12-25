import ThemedContainer from "@/components/ThemedContainer";
import { useState } from "react";
import { Image, StyleSheet, View, Text, ToastAndroid } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { register } from "@/apis/user";
import { router } from "expo-router";

export default function RegisterScreen() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAgree, setIsAgree] = useState(false)


    const handleRegister = async () => {
        if (!isAgree) {
            ToastAndroid.show('请阅读并同意用户协议和隐私政策', ToastAndroid.SHORT);
            return;
        }

        if (password !== confirmPassword) {
            ToastAndroid.show('两次密码不一致', ToastAndroid.SHORT);
            return;
        }

        try {
            const { id } = await register({ username, email, password, name })
            
            if(id) {
                ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                router.push('/login')
            } else {
                ToastAndroid.show('注册失败,请稍后再试', ToastAndroid.SHORT);   
            }
        } catch (error) {
            ToastAndroid.show('注册失败,请稍后再试', ToastAndroid.SHORT);   
        }
    }

    return (
        <ThemedContainer>
            <Image source={require('@/assets/images/login_bg.png')} style={styles.bg} />
            <View style={styles.form}>
                <TextInput mode="outlined" label="昵称" value={name} onChangeText={setName} />
                <TextInput mode="outlined" label="用户名" value={username} onChangeText={setUsername} />
                <TextInput mode="outlined" label="邮箱" value={email} onChangeText={setEmail} />
                <TextInput mode="outlined" label="密码" value={password} onChangeText={setPassword} />
                <TextInput mode="outlined" label="确认密码" value={confirmPassword} onChangeText={setConfirmPassword} />
                <Button style={styles.button} mode="contained" onPress={handleRegister}>注册</Button>

                <View style={styles.footer}>
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
        </ThemedContainer>
    )
}

const styles = StyleSheet.create({
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
    button: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 4,
        borderRadius: 10
    },
    footer: {
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