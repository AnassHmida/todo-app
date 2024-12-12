import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from '@/components/common/Checkbox';
import {IconButton} from '@/components/common/IconButton';
import {styles} from '@/styles/components/todo/TodoItem.styles';
import {Todo} from '@/types/todo';
import {Input} from '@/components/common/Input';
import {theme} from '@/theme';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const TodoItem = ({todo, onToggle, onDelete, onEdit}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSubmitEdit = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== todo.title) {
      onEdit(todo.id, trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSubmitEdit();
  };

  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  return (
    <View style={styles.container}>
      <Checkbox
        testID="checkbox"
        checked={todo.completed}
        onPress={() => onToggle(todo.id)}
        style={styles.checkbox}
      />
      {isEditing ? (
        <View style={styles.editContainer}>
          <Input
            testID="todo-input"
            value={editedTitle}
            onChangeText={setEditedTitle}
            onSubmitEditing={handleSubmitEdit}
            onBlur={handleBlur}
            style={styles.input}
            multiline
            numberOfLines={3}
            returnKeyType="done"
          />
          <IconButton
            testID="save-button"
            icon="save"
            onPress={handleSubmitEdit}
            color={theme.colors.success}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.content} onPress={() => setIsEditing(true)}>
          <Text testID="todo-text" style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.actions}>
        <IconButton testID="delete-button" icon="delete" onPress={() => onDelete(todo.id)} />
      </View>
    </View>
  );
};