import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

interface IconButtonProps {
  icon: 'edit' | 'delete' | 'logout' | 'save';
  onPress: () => void;
  color?: string;
  size?: number;
  testID?: string;
}

const ICONS = {
  edit: '✎',
  delete: '×',
  logout: '⇥',
  save: '✓',
};

export const IconButton = ({icon, onPress, size = 24, testID}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, {width: size, height: size}]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}>
      <Text style={[styles.icon, icon === 'delete' && styles.deleteIcon]}>{ICONS[icon]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  deleteIcon: {
    color: theme.colors.danger,
    fontSize: 24,
  },
});
