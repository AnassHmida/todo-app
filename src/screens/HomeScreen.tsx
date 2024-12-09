import React, {useState, useEffect} from 'react';
import {SectionList, View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoItem} from '@/components/todo/TodoItem';
import {TodoInput} from '@/components/todo/TodoInput';
import {TodoHeader} from '@/components/todo/TodoHeader';
import {TodoSectionHeader} from '@/components/todo/TodoSectionHeader';
import {EmptyState} from '@/components/common/EmptyState';
import {useTodoStore} from '@/store/todoStore';
import {styles} from '@/styles/screens/HomeScreen.styles';
import {LoadingOverlay} from '@/components/common/LoadingOverlay';

export const HomeScreen = () => {
  const [newTodo, setNewTodo] = useState('');
  const {todos, isLoading, error, fetchTodos, addTodo, toggleTodo, removeTodo, updateTodo} =
    useTodoStore();

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleAddTodo = () => {
    if (newTodo.trim() && addTodo) {
      addTodo({title: newTodo.trim(), completed: false});
      setNewTodo('');
    }
  };

  if (isLoading && todos.length === 0) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchTodos} />
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <TodoHeader />
        <TodoInput value={newTodo} onChangeText={setNewTodo} onSubmit={handleAddTodo} />
        <EmptyState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TodoHeader />
      <TodoInput value={newTodo} onChangeText={setNewTodo} onSubmit={handleAddTodo} />
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem todo={item} onToggle={toggleTodo} onDelete={removeTodo} onEdit={updateTodo} />
        )}
        renderSectionHeader={({section: {title, data}}) =>
          data.length > 0 ? <TodoSectionHeader title={title} /> : null
        }
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};
