import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

interface IconButtonProps {
  icon: 'edit' | 'delete';
  onPress: () => void;
  style?: any;
}

const ICONS = {
  edit: '✎',
  delete: '×',
};

export const IconButton = ({icon, onPress, style}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
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
