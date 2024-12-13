import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
    alignItems: 'flex-start',
    gap: theme.spacing.m,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: 12,
    padding: theme.spacing.m,
    fontSize: 16,
    minHeight: 48,
    textAlignVertical: 'top',
  },
  button: {
    width: 70,
    height: 48,
  },
});
