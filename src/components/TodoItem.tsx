import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Checkbox} from '@/components/common/Checkbox';
import {IconButton} from '@/components/common/IconButton';
import {styles} from '@/styles/components/TodoItem.styles';
import {Todo} from '@/types/todo';

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
      setEditedTitle(trimmedTitle);
    } else {
      setEditedTitle(todo.title); // Reset to original if empty
    }
    setIsEditing(false);
  };

  // Reset editedTitle when todo changes
  useEffect(() => {
    setEditedTitle(todo.title);
  }, [todo.title]);

  return (
    <View style={styles.container}>
      <Checkbox
        checked={todo.completed}
        onPress={() => onToggle(todo.id)}
        style={styles.checkbox}
      />
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedTitle}
          onChangeText={setEditedTitle}
          onBlur={handleSubmitEdit}
          onSubmitEditing={handleSubmitEdit}
          autoFocus
        />
      ) : (
        <TouchableOpacity style={styles.content} onPress={() => setIsEditing(true)}>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>{todo.title}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.actions}>
        <IconButton icon="edit" onPress={() => setIsEditing(true)} />
        <IconButton icon="delete" onPress={() => onDelete(todo.id)} />
      </View>
    </View>
  );
};
