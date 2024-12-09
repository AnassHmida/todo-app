import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from './Input';
import {Button} from './Button';
import {theme} from '@/theme';

export interface InputWithButtonProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  buttonTitle?: string;
  disabled?: boolean;
  multiline?: boolean;
}

export const InputWithButton = ({
  value,
  onChangeText,
  onSubmit,
  placeholder,
  buttonTitle = 'Submit',
  disabled,
  multiline,
}: InputWithButtonProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          disabled={disabled}
        />
      </View>
      <Button title={buttonTitle} onPress={onSubmit} disabled={disabled || !value.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  inputWrapper: {
    marginBottom: theme.spacing.sm,
  },
});
