import React, {useState} from 'react';
import {SectionList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoItem} from '@/components/TodoItem';
import {TodoInput} from '@/components/TodoInput';
import {TodoHeader} from '@/components/TodoHeader';
import {TodoSectionHeader} from '@/components/TodoSectionHeader';
import {useTodoStore} from '@/store/todoStore';
import {styles} from '@/styles/screens/HomeScreen.styles';

export const HomeScreen = () => {
  const [newTodo, setNewTodo] = useState('');
  const {todos, toggleTodo, removeTodo, addTodo, updateTodo} = useTodoStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({title: newTodo.trim(), completed: false});
      setNewTodo('');
    }
  };

  const handleEditTodo = (id: string, newTitle: string) => {
    updateTodo(id, {title: newTitle});
  };

  const sections = [
    {
      title: 'Active',
      data: todos.filter(todo => !todo.completed),
    },
    {
      title: 'Completed',
      data: todos.filter(todo => todo.completed),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TodoHeader />
      <TodoInput value={newTodo} onChangeText={setNewTodo} onSubmit={handleAddTodo} />
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={removeTodo}
            onEdit={handleEditTodo}
          />
        )}
        renderSectionHeader={({section: {title, data}}) =>
          data.length > 0 ? <TodoSectionHeader title={title} /> : ''
        }
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};
