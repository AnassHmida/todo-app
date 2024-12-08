import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native';
import {colors} from '@/theme/colors';
import {spacing} from '@/theme/spacing';
import {typography} from '@/theme/typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({title, variant = 'primary', style, ...props}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, styles[variant], style]} {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
  primaryText: {
    color: colors.background,
  },
  secondaryText: {
    color: colors.primary,
  },
});
