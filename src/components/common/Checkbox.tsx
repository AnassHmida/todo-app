import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '@/theme';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const Checkbox = ({checked, onPress, style, testID}: CheckboxProps) => (
  <TouchableOpacity
    testID={testID}
    style={[styles.checkbox, checked && styles.checked, style]}
    onPress={onPress}>
    {checked && <Icon name="check" size={16} color={theme.colors.text.primary} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.secondary,
  },
  checked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
