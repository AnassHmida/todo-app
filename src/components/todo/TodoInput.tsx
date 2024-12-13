import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { theme } from '@/theme';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TodoInput = ({ value, onChangeText, onSubmit }: TodoInputProps) => (
  <View style={styles.container}>
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="What needs to be done?"
      style={styles.input}
      onSubmitEditing={onSubmit}
    />
    <Button title="Add" onPress={onSubmit} disabled={!value.trim()} style={styles.button} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    gap: theme.spacing.s,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.medium,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.l,
  },
});
