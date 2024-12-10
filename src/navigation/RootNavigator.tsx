import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/screens/HomeScreen';
import {LoginScreen} from '@/screens/LoginScreen';
import {useAuthStore} from '../store/authStore';
import {RootStackParamList} from './types';
import {IconButton} from '@/components/common/IconButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LogoutButton = () => {
  const logout = useAuthStore(state => state.logout);
  return <IconButton icon="logout" onPress={logout} />;
};

export const RootNavigator = () => {
  const user = useAuthStore(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => <LogoutButton />,
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
