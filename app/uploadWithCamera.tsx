import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState , useRef } from 'react';
import { Button, StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function UploadWithCamera() {

     const [facing, setFacing] = useState('back');
     const cameraRef = useRef(null);
     const [permission, requestPermission] = useCameraPermissions();
     const [photo, setPhoto] = useState(null);

     const takePicture = async () => {

       if (cameraRef.current) {
          try {
            const data = await cameraRef.current.takePictureAsync({
              quality: 0.5,
              base64: true,
              exif: false,
            });

            console.log('촬영 성공:', data.uri);
            setPhoto(data.uri);
            router.replace('/mainMobileWebView', params:{ path: '/member_block_ind/main/mainUploadDocumentConfirm'})
          } catch (e) {
            console.error('촬영 실패:', e);
            Alert.alert("에러", "사진을 촬영하지 못했습니다.");
          }
       }
    };

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
          <View style={styles.container}>
            <Text>Permission for Camera is required</Text>
            <TouchableOpacity onPress={requestPermission} title="권한 허용하기" >
                <Text>허가</Text>
            </TouchableOpacity>
          </View>
        );
    }

      return (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                  <Text>촬영</Text>
               </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row', margin: 64 },
});