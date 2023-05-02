import React from 'react';
import { AppUI } from './AppUI';
// import './App.css'

// const defaultTodos = [
//   {text: 'Cortar cebollar', completed: true},
//   {text: 'Tomar el curso de intro a react', completed: false},
//   {text: 'Ver Anime Your Lie in April', completed: false},
//   {text: "Ver Anime Hell's paradise", completed: true},
// ]

// Recibimos como parámetros el nombre y el estado inicial de nuestro item.
function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    // Simulamos un segundo de delay de carga 
    setTimeout(() => {
      // Manejamos la tarea dentro de un try/catch por si ocurre algún error
      try{
        // Guardamos nuestro item en una constante
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        // Utilizamos la lógica que teníamos, pero ahora con las variables y parámentros nuevos
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false)
      }catch(error){
        // En caso de un error lo guardamos en el estado
        setError(error)
      }
    }, 1000);
  });

  // Actualizamos la función para guardar nuestro item con las nuevas variables y parámetros
  const saveItem = (newItem) => {
    // Manejamos la tarea dentro de un try/catch por si ocurre algún error
    try{
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    }catch(error){
      setError(error)
    }
  };

  // Para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
  return {
    item,
    saveItem,
    loading,
    error
  };
}

function App() {
  // Desestructuramos los nuevos datos de nustro custom hook
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
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
  // Logica para completar un ToDo
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };
  // Logica para eliminar un ToDo
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      totalTodos={totalTodos} 
      completedTodos={completedTodos} 
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App
