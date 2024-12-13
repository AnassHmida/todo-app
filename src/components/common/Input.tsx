import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {theme} from '@/theme';

interface InputProps extends TextInputProps {
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({disabled, ...props}) => {
  return (
    <TextInput
      {...props}
      editable={!disabled}
      style={[styles.input, disabled && styles.disabled, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    fontSize: 16,
    backgroundColor: theme.colors.background.primary,
    color: theme.colors.text.primary,
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
    opacity: 0.7,
  },
});
