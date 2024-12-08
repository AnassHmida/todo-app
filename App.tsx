/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {RootNavigator} from '@/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ErrorBoundary} from '@/components/ErrorBoundary';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
