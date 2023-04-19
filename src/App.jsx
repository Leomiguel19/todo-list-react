import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
// import './App.css'

const defaultTodos = [
  {text: 'Cortar cebollar', completed: true},
  {text: 'Tomar el curso de intro a react', completed: false},
  {text: 'Ver Anime Your Lie in April', completed: false},
  {text: "Ver Anime Hell's paradise", completed: true},
]

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
    // El estado de nuestra búsqueda
  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter(todos => !!todos.completed).length;
  const totalTodos = todos.length;
  // Creamos una nueva variable en donde guardaremos las coincidencias con la búsqueda
  let searchedTodos = [];

  // Lógica para filtrar
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  return (
    <React.Fragment>
      <TodoCounter
        completedTodos={completedTodos}
        totalTodos={totalTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            />
        ))}  
      </TodoList>

      <CreateTodoButton/>
    </React.Fragment>
  );
}

export default App
