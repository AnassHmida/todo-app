import React from 'react';
import {SectionHeader} from '@/components/common/SectionHeader';

interface TodoSectionHeaderProps {
  title: string;
  count?: number;
}

export const TodoSectionHeader = ({title, count}: TodoSectionHeaderProps) => (
  <SectionHeader title={title} count={count} />
);
