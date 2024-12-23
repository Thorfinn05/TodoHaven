import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { PomodoroTimer } from './components/PomodoroTimer';
import { StudyPlanner } from './components/features/StudyPlanner/index';
import { Flashcards } from './components/features/Flashcards/index';
import { QuickNotes } from './components/features/QuickNotes/index';
import { ProgressTracker } from './components/features/ProgressTracker/ProgressTracker';
import { Navbar } from './components/navigation/Navbar';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { useNavigation } from './hooks/useNavigation';
import { CalendarCheck, CalendarCheck2, CalendarCheck2Icon, Home, LucideCalendarCheck, LucideCalendarCheck2 } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const { activeFeature, isNavOpen, toggleNav, setActiveFeature } = useNavigation();

  const renderFeature = () => {
    switch (activeFeature) {
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'studyPlanner':
        return <StudyPlanner />;
      case 'flashcards':
        return <Flashcards />;
      case 'notes':
        return <QuickNotes />;
      case 'progress':
        return <ProgressTracker />;
      default:
        return (
          <>
            <div className="mb-8">
              <TodoForm onSubmit={addTodo} />
            </div>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={updateTodo}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar
        isOpen={isNavOpen}
        activeFeature={activeFeature}
        onToggle={toggleNav}
        onFeatureSelect={setActiveFeature}
      />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <LucideCalendarCheck2 className="text-primary-500 w-12 h-12 mr-3" />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                TodoHaven
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Your personal sanctuary for tasks and productivity
              </p>
            </div>
          </div>
          
          {renderFeature()}
        </div>
      </div>
    </div>
  );
}

export default App;