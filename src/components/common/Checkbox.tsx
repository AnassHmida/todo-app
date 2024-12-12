import React from 'react';
import {TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {theme} from '@/theme';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Checkbox = ({checked, onPress, style, testID}: CheckboxProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}>
      {checked && <View style={styles.checked} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.primary,
  },
});