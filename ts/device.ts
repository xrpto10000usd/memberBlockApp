import * as Application from 'expo-application';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const DEVICE_ID_KEY = 'device-id';

export async function getDeviceId() {

   try {
      if (Platform.OS === 'android') {
        return Application.androidId; // string
      } else if (Platform.OS === 'ios') {
        return await Application.getIosIdForVendorAsync(); // Promise<string>
      }
      return null;
    } catch (error) {

      console.error('Failed to get device ID:', error);
      return null;

    }
}

export async function getDeviceUId(): Promise<string> {
  try {
    let id = await SecureStore.getItemAsync(DEVICE_ID_KEY);

    if (!id) {
      id = Crypto.randomUUID();
      await SecureStore.setItemAsync(DEVICE_ID_KEY, id);
    }

    return id; // 항상 string 반환
  } catch (error) {

    return 'unknown-device';
  }
}

export const deviceInfo = {
    "device" : Device
}

async function getDeviceIdInfo() {

    const uid = await numericKeyPad.getDeviceUId(); // 여기서 await
    return uid;
}
