/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {RootNavigator} from '@/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {initDatabase} from '@/services/database';
import {LoadingOverlay} from '@/components/common/LoadingOverlay';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    init();
  }, []);

  if (!isReady) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
