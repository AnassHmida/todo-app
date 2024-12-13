import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  testID,
}: ButtonProps) => (
  <TouchableOpacity
    testID={testID}
    style={[
      styles.button,
      styles[variant],
      disabled && styles.disabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.m,
    borderRadius: theme.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
    opacity: 0.7,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
