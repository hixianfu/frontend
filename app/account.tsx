import { StyleSheet, ToastAndroid, View } from 'react-native';
import { fetchProfile, updateUserAvatar } from '@/apis/user';
import ThemedCell from '@/components/ThemedCell';
import ThemedContainer from '@/components/ThemedContainer';
import { useEffect, useState } from 'react';
import { Avatar, Dialog, Icon, PaperProvider, Portal, Button, Text } from 'react-native-paper';
import { User } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { router } from 'expo-router';

export default function AccountScreen() {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation()
    const [profile, setProfile] = useState<User | null>(null)

    const getProfile = async () => {
        const userProfile = await fetchProfile()

        setProfile(userProfile)
        setItemAsync('user', JSON.stringify(userProfile))
    }

    useEffect(() => {
        getProfile();
    }, [])

    // 退出登录
    const handleLogout = () => {
        setVisible(false)
        deleteItemAsync('access_token');

        navigation.navigate('login' as never)
    }

    const uploadAvatar = async () => {
        // 选择图片
        const result = await launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })


        if (result.canceled) return

        const { uri } = result.assets[0]

        try {
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'image/jpeg',
                name: 'avatar.jpg'
            } as any)

            await updateUserAvatar({ id: JSON.parse(await getItemAsync('user') || '{}').id, file: formData })

            getProfile()
            ToastAndroid.show('修改头像成功', ToastAndroid.SHORT)
        } catch (error) {
            ToastAndroid.show('修改头像失败', ToastAndroid.SHORT)
        }

    }

    return (
        <PaperProvider>
            <ThemedContainer style={{ padding: 20 }}>
                <View style={styles.profileContainer}>
                    <Button onPress={uploadAvatar} style={{ width: 130, alignSelf: 'center' }}>
                        <Avatar.Image source={profile?.avatar ? { uri: profile.avatar } : require('@/assets/images/avatar.jpg')} size={100} style={styles.avatar} />
                    </Button>
                    <View>
                        <Text variant="titleLarge">{profile?.name}</Text>
                        <Text variant="bodyLarge">账号：{profile?.username}</Text>
                    </View>
                </View>
                <ThemedCell title="相机拍摄" icon={<Icon source="chevron-right" size={24} color="#000" />} onPress={() => router.push('/camera')} />
                <ThemedCell title="退出登录" icon={<Icon source="chevron-right" size={24} color="#000" />} onPress={() => setVisible(true)} />
                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                            <Dialog.Title>
                                <Icon source="alert-circle" size={24} color="#000" />
                            </Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">
                                    是否确认退出当前账号
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => setVisible(false)}>取消</Button>
                                <Button onPress={handleLogout}>确认</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </ThemedContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    avatar: {
        marginTop: 40,
        alignSelf: 'center',
    },
});
