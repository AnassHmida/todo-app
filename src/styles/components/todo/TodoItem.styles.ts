import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  },
  checkbox: {
    marginRight: theme.spacing.sm,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.sm,
    minHeight: 40,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: 8,
    backgroundColor: theme.colors.background.primary,
    ...theme.typography.body,
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
});
