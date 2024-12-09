import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

interface SectionHeaderProps {
  title: string;
  count?: number;
  rightElement?: React.ReactNode;
}

export const SectionHeader = ({title, count, rightElement}: SectionHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      {count !== undefined && <Text style={styles.count}>({count})</Text>}
    </View>
    {rightElement}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  count: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
  },
});
