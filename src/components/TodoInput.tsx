import React from 'react';
import {View, TextInput} from 'react-native';
import {Button} from '@/components/common/Button';
import {styles} from '@/styles/components/TodoInput.styles';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TodoInput = ({value, onChangeText, onSubmit}: TodoInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="What needs to be done?"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          multiline
          numberOfLines={3}
        />
      </View>
      <Button title="Add" onPress={onSubmit} disabled={!value.trim()} style={styles.button} />
    </View>
  );
};
