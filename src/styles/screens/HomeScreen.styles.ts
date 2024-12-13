import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  listContent: {
    padding: theme.spacing.m,
  },
  error: {
    ...theme.typography.body,
    color: theme.colors.disabled,
    textAlign: 'center',
    padding: theme.spacing.l,
  },
});
