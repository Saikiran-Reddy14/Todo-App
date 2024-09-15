import React, { useRef, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Container, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const topRef = useRef(null);

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    topRef.current.scrollIntoView({ behavior: "smooth" });
    topRef.current.focus();
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <Container>
      <Typography
        variant="h2"
        gutterBottom
        textAlign={"center"}
        color="#ff6600"
      >
        Todo App
      </Typography>
      <TodoForm
        topRef={topRef}
        todoToEdit={editingTodo}
        onCancel={handleCancelEdit}
      />
      <TodoList
        topRef={topRef}
        onEdit={handleEditTodo}
        onCancel={handleCancelEdit}
      />
    </Container>
  );
};

export default App;
