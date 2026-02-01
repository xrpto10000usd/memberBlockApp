import React, { useEffect, useState , useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useAuthStore } from '@/ts/auth/authStorage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function MainMobileWebView() {

    const { isLogin , passCodeReset } = useLocalSearchParams();
    let memberBlockWeb = 'http://10.138.61.203:3000/member_block_ind/main/mainFront'

    const loginSuccess = isLogin === 'true';
    const isPassCodeRest = passCodeReset === 'true';

    if (!loginSuccess && isPassCodeRest) {
        memberBlockWeb = 'http://10.138.61.203:3000/member_block_ind/'
    }

    const { token, userId, hasHydrated } = useAuthStore();
    const navState = useRootNavigationState();
    const webViewRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    if (!hasHydrated) {
       return null;
    }
    if ( ( !token || !userId ) && !isPassCodeRest) {
       return <Redirect href="/passCodeLogin" />;
    }

    webViewRef.current?.postMessage(
       JSON.stringify({ token: token, userId: userId })
    );

    return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <WebView source={{ uri: memberBlockWeb }}
                           style={{ flex: 1 }}
                           ref={webViewRef}
                           onLoadEnd={() => {
                                        setIsReady(true);
                                   }}
                           />
                </SafeAreaView>
            </SafeAreaProvider>

        )
}