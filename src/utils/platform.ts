import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const select = <T>(config: {ios?: T; android?: T; web?: T; default: T}): T => {
  if (isIOS && config.ios) return config.ios;
  if (isAndroid && config.android) return config.android;
  if (isWeb && config.web) return config.web;
  return config.default;
};
