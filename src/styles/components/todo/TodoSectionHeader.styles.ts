import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  sectionTitle: {
    ...theme.typography.title,
    color: theme.colors.text.secondary,
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.m,
  },
});
