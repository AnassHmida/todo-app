/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {RootNavigator} from '@/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {isWeb} from '@/utils/platform';

const App = () => {
  useEffect(() => {
    if (!isWeb) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
