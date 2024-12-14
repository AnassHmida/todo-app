import {Platform, NativeModules} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const isEmulator = (): boolean => {
  if (isAndroid) {
    return (
      NativeModules.PlatformConstants?.Brand === 'google' ||
      NativeModules.PlatformConstants?.Manufacturer === 'Google' ||
      NativeModules.PlatformConstants?.Fingerprint.includes('generic')
    );
  }

  if (isIOS) {
    return Boolean(NativeModules.PlatformConstants?.isEmulator);
  }

  return false;
};

export const select = <T>(config: {ios?: T; android?: T; web?: T; default: T}): T => {
  if (isIOS && config.ios) return config.ios;
  if (isAndroid && config.android) return config.android;
  if (isWeb && config.web) return config.web;
  return config.default;
};
