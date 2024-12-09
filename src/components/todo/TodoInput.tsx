import React from 'react';
import {InputWithButton, InputWithButtonProps} from '@/components/common/InputWithButton';

export type TodoInputProps = Omit<InputWithButtonProps, 'placeholder' | 'buttonTitle'>;

export const TodoInput = (props: TodoInputProps) => (
  <InputWithButton {...props} placeholder="What needs to be done?" buttonTitle="Add" multiline />
);
