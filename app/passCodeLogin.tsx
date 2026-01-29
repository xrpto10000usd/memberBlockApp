import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput , TouchableOpacity , View , Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { create } from 'zustand';
import * as DeviceInfo from '@/ts/device';
import * as auth from '@/ts/auth/auth';
import { useAuthStore } from '@/ts/auth/authStorage';
import { router, useRootNavigationState , Redirect } from 'expo-router';

const numericKeyPad = auth.shuffleArray([1,2,3,4,5,6,7,8,9])

export default function PassCodeLogin() {

  const [passCode, setPassCode] = useState(['','','','','',''])
  const logout = useAuthStore(state => state.logout);
  const { setAuth } = useAuthStore();

  const onLogout = () => {
      logout(); // 🔥 authStorage 비움
  };

  const handlePress = (num) => {
      setPassCode(prev => {
        const next = [...prev];
        const idx = next.findIndex(v => v === '');
        if (idx !== -1) next[idx] = num.toString();
        return next;
      });
  };

  const refresh = () => {
      setPassCode(prev => {
        return ['','','','','',''];
      });
  };

  const deletePassKey = () => {
    setPassCode(prev => {
        const next = [...prev];
        const idx = next.findIndex(v => v === '');
        if (idx !== -1) next[idx-1] = '';
        return next;
    });
  };

  useEffect(() => {

    const userPassCode = passCode.join('');

    if (userPassCode === '999999') {
        console.log(userPassCode, ' <== userPassCode')
        setAuth('sampleToken', 'memberBlockDummy');
        router.replace('/mainMobileWebView')
    } else if (userPassCode.length === 6) {
        refresh();
        return;
    }

  }, [passCode]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/member-block-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
       <ThemedView style={styles.inputContainer}>
            {passCode.map((passCodeValue, i) => (
               <TextInput
                 key={i}
                 value={passCodeValue ? '•' : ''}
                 style={styles.input}
                 keyboardType="number-pad"
                 maxLength={1}
               />
             ))}
       </ThemedView>
       <ThemedView style={[styles.numericKeyPad, styles.buttonWrapper]}>
         {numericKeyPad.map((row, rowIndex) => (
           <View key={rowIndex} style={styles.buttonViewWrapper}>
             {row.map((num, colIndex) => (
               <TouchableOpacity
                 key={`${rowIndex}-${colIndex}`}
                 style={styles.button}
                 onPress={() => handlePress(num)}
               >
                 <Text style={styles.numKeyButton}>
                   {String(num)}
                 </Text>
               </TouchableOpacity>
             ))}
           </View>
         ))}

         <View style={styles.buttonViewWrapper}>
           <TouchableOpacity style={styles.button} onPress={() => refresh()}>
             <Text style={styles.numKeyButton}>⟳</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
             <Text style={styles.numKeyButton}>0</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={() => deletePassKey()}>
             <Text style={styles.numKeyButton}>⌫</Text>
           </TouchableOpacity>
         </View>
       </ThemedView>
       <ThemedView style={styles.passKeyForgot}>
            <TouchableOpacity>
                <Text style={styles.passKeyForgotText}>Forgot My Passcode</Text>
            </TouchableOpacity>
       </ThemedView>
       {/**/}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 125,
    width: '100%',
    top: 100,
    position: 'absolute',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
      width: 45,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      textAlign: 'center',
      fontSize: 20,
      borderRadius: 8,
   },
   numericKeyPad: {
       flexDirection: 'row',
       flexWrap: 'wrap',
       width: '100%',
       paddingHorizontal: 0

   },
   buttonWrapper: {
       marginHorizontal: 8,  // 버튼 사이 간격
       width: '100%',            // 버튼 너비 고정
       top: '9%'
   },
   buttonViewWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 0,
        width: '100%'
   },
   numKeyButton: {
       fontSize: 35,
       color: '#000000',
       fontWeight: 'bold',
       alignItems: 'center'
   },
   button: {
        flex: 1,               // 1/3씩 동일 너비
        height: 80,            // 버튼 높이
        margin: 5,             // 버튼 간격
        backgroundColor: 'white',
        color: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
   },
   passKeyForgot: {
       alignItems: 'center' ,
       top: '5%'
   },
   passKeyForgotText: {
       textDecorationLine: 'underline' ,
        fontSize: 15
   }

});