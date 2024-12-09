import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
});
