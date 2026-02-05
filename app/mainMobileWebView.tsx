import React, { useEffect, useState , useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useAuthStore } from '@/ts/auth/authStorage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function MainMobileWebView() {

    const webViewRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const { path } = useLocalSearchParams();
    const { token, userId, hasHydrated } = useAuthStore();
    const navState = useRootNavigationState();

    useEffect(() => {
        if (isReady && token && userId) {
            webViewRef.current?.postMessage(JSON.stringify({ token: token, userId: userId }));
    }}, [isReady, token, userId]);

    const handleMessage = (event) => {
        const data = event.nativeEvent.data;
        console.log('웹에서 받은 데이터:', data);

        try {
          const parsedData = JSON.parse(data);
          console.log('파싱된 데이터:', parsedData);

          if ( parsedData.action === 'openCameraForPhoto') {
            router.replace('/uploadWithCamera');
          }

        } catch (e) {
          console.log('JSON 데이터가 아닙니다.');
        }
    };

    const memberBlockWeb = 'http://10.138.60.191:3000'+path;

    if (!hasHydrated) {
       return null;
    }
    if ( ( !token || !userId ) && !isPassCodeRest) {
       console.log(token, userId)
       return <Redirect href="/passCodeLogin" />;
    }

    console.log(isReady);
    return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <WebView source={{ uri: memberBlockWeb }}
                           style={{ flex: 1 }}
                           ref={webViewRef}
                           onMessage={handleMessage}
                           onLoadEnd={() => {
                                        if (!isReady) {
                                            setIsReady(true);
                                        }
                                   }}
                           />
                </SafeAreaView>
            </SafeAreaProvider>

        )
}