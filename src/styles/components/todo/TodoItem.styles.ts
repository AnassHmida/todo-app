import { StyleSheet, TextStyle } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.small,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  title: {
    ...(theme.typography.body as TextStyle),
    color: theme.colors.text.primary,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.secondary,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...(theme.typography.body as TextStyle),
    flex: 1,
    marginRight: theme.spacing.m,
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.background.secondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
