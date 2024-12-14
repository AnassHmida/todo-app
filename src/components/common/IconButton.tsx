import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '@/theme';

interface IconButtonProps {
  name: string;
  onPress: () => void;
  color?: string;
  size?: number;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const IconButton = ({
  name,
  onPress,
  color = theme.colors.text.secondary,
  size = 24,
  disabled = false,
  style,
  testID,
}: IconButtonProps) => (
  <TouchableOpacity
    testID={testID}
    style={[styles.button, disabled && styles.disabled, style]}
    onPress={onPress}
    disabled={disabled}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.small,
  },
  disabled: {
    opacity: 0.5,
  },
});
