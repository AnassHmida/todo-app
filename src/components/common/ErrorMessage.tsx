import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({message}: ErrorMessageProps) => {
  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
    fontSize: 14,
    textAlign: 'center',
  },
});
