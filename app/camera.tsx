import ThemedContainer from "@/components/ThemedContainer";
import { CameraType, CameraView } from "expo-camera";
import { useCameraPermissions } from "expo-image-picker";
import { useRef, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";


export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back')
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView | null>(null)

    if (!permission) return <Text>请允许访问相机</Text>

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleTakePhoto = async () => {
        const photo = await cameraRef.current?.takePictureAsync()
        if (photo) {
            console.log(photo)
        }
    }

    return (
        <ThemedContainer>
            <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress=
                        {() => setFacing(facing === 'back' ? 'front' : 'back')}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </ThemedContainer>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})
