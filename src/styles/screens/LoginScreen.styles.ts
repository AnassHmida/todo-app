import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  form: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    gap: theme.spacing.l,
  },
  title: {
    ...theme.typography.header,
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: theme.spacing.m,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.m,
  },
  buttonText: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
