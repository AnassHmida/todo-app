import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {theme} from '@/theme';

interface InputProps extends TextInputProps {
  disabled?: boolean;
}

export const Input = ({style, disabled, ...props}: InputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      editable={!disabled}
      placeholderTextColor={theme.colors.gray[400]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: 8,
    padding: theme.spacing.md,
    fontSize: 16,
    backgroundColor: theme.colors.background.primary,
  },
});
