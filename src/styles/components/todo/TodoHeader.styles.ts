import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

export const styles = StyleSheet.create({
  title: {
    ...theme.typography.header,
    color: theme.colors.text.primary,
    padding: theme.spacing.l,
  },
});
