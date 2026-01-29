import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { router, useRootNavigationState , Redirect } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useAuthStore } from '@/ts/auth/authStorage';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function mainMobileWebView() {

    const memberBlockWeb = 'http://10.138.60.115:3000/member_block_ind/'

    const { token, userId, hasHydrated } = useAuthStore();
    const navState = useRootNavigationState();

    if (!hasHydrated) {
       return null;
    }
    if (!token || !userId) {
       return <Redirect href="/passCodeLogin" />;
    }

    return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <WebView source={{ uri: memberBlockWeb }} style={{ flex: 1 }} />
                </SafeAreaView>
            </SafeAreaProvider>

        )
}