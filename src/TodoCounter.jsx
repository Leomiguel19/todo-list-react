import React from "react";
import "./todoCounter.css";

function TodoCounter({completedTodos, totalTodos}) {
  return <h2 className="TodoCounter">Has complentado {completedTodos} de {totalTodos} ToDos</h2>;
}

export { TodoCounter };
