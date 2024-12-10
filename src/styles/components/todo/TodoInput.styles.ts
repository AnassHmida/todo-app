import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    fontSize: 16,
    minHeight: 48,
    textAlignVertical: 'top',
  },
  button: {
    width: 70,
    height: 48,
  },
});
