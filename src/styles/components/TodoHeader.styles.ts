import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    padding: theme.spacing.lg,
  },
});
