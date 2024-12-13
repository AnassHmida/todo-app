import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {theme} from '@/theme';

export const LoadingOverlay = () => (
  <View style={styles.container} testID="loading-overlay">
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    alignItems: 'center',
  },
});
