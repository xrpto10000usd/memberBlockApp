import * as Application from 'expo-application';
import { Platform } from 'react-native';

async function getDeviceId() {
  if (Platform.OS === 'android') {
    return Application.androidId;
  } else {
    return await Application.getIosIdForVendorAsync();
  }
}