import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { useAuthStore } from '@/store/authStore';
import { styles } from '@/styles/screens/LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back</Text>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          disabled={isLoading}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          disabled={isLoading}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingOverlay />
          </View>
        ) : (
          <>
            <Button title="Login" onPress={handleLogin} disabled={!username || !password} />
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>Don't have an account? Sign up</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
