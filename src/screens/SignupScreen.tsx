import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '@/components/common/Input';
import {Button} from '@/components/common/Button';
import {LoadingOverlay} from '@/components/common/LoadingOverlay';
import {useAuthStore} from '@/store/authStore';
import {styles} from '@/styles/screens/SignupScreen.styles';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/types';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signup, isLoading, error} = useAuthStore();
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = () => {
    signup(username, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Sign up to start managing your tasks</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            autoCapitalize="none"
            disabled={isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            disabled={isLoading}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingOverlay />
          </View>
        ) : (
          <>
            <Button
              title="Create Account"
              onPress={handleSignup}
              disabled={!username || !password}
              style={styles.button}
            />
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={({pressed}) => [styles.linkContainer, pressed && {opacity: 0.7}]}>
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkHighlight}>Login</Text>
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
