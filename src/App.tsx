import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { CalendarCheck, CalendarDays, CalendarHeart, Home } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <CalendarCheck className="text-blue-500 w-12 h-12 mr-3" />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                TodoHaven
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Your personal sanctuary for tasks and productivity
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <TodoForm onSubmit={addTodo} />
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;