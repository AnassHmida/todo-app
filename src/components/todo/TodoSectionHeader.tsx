import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '@/theme';

interface TodoSectionHeaderProps {
  title: string;
  testID?: string;
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.m,
  },
});

export const TodoSectionHeader: React.FC<TodoSectionHeaderProps> = ({ title, testID }) => {
  return (
    <Text style={styles.sectionTitle} testID={testID}>
      {title}
    </Text>
  );
};
