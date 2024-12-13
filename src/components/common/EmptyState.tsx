import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const EmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.title}>No Tasks Yet</Text>
    <Text style={styles.message}>Add your first task using the input above!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  } as const,
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  } as const,
  message: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '400' as const,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  } as const,
});
