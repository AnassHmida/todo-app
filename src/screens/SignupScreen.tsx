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

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useAuthStore();
    const navigation = useNavigation<SignupScreenNavigationProp>();

    const handleSignup = () => {
        signup(username, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Create Account</Text>
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
                        <Button
                            title="Sign Up"
                            onPress={handleSignup}
                            disabled={!username || !password}
                        />
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Already have an account? Login</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};