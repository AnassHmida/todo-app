import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

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
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
