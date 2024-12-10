import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {theme} from '@/theme';

interface FormProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Form = ({children, style}: FormProps) => {
  return <View style={[styles.form, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  form: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
});
