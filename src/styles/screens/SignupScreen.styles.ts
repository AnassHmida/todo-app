import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

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
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center' as const,
    marginBottom: theme.spacing.l,
    fontSize: 16,
    fontWeight: '400' as const,
  },
  inputContainer: {
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    fontSize: 14,
    fontWeight: '400' as const,
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
    marginTop: theme.spacing.l,
  },
  buttonText: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: theme.spacing.m,
    alignItems: 'center',
  },
  linkText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    fontWeight: '400' as const,
  },
  linkHighlight: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
