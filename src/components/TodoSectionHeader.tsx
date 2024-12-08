import React from 'react';
import {Text} from 'react-native';
import {styles} from '@/styles/components/TodoSectionHeader.styles';

interface TodoSectionHeaderProps {
  title: string;
}

export const TodoSectionHeader = ({title}: TodoSectionHeaderProps) => {
  return <Text style={styles.sectionTitle}>{title.toString()}</Text>;
};
