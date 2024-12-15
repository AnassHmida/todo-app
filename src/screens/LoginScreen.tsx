import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '@/components/common/Input';
import {LoadingOverlay} from '@/components/common/LoadingOverlay';
import {useAuthStore} from '@/store/auth/authStore';
import {styles} from '@/styles/screens/LoginScreen.styles';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/types';
import {Button} from '@/components/common/Button';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, status, error} = useAuthStore();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>ToDo App</Text>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          editable={!status}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          editable={!status}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {status === 'loading' ? (
          <View style={styles.loadingContainer}>
            <LoadingOverlay />
          </View>
        ) : (
          <Button
            title="Login"
            onPress={handleLogin}
            disabled={!username || !password}
            style={styles.button}
          />
        )}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={({pressed}) => [styles.linkContainer, pressed && {opacity: 0.7}]}>
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
