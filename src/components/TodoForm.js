import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/actions";
import { Button, TextField } from "@mui/material";

const TodoForm = ({ todoToEdit, onCancel, topRef }) => {
  const [todo, setTodo] = useState(todoToEdit ? todoToEdit.todo : "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
    } else {
      setTodo("");
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.trim().length === 0) {
      return alert("Todo cannot be empty");
    }
    if (todoToEdit) {
      dispatch(
        updateTodo({
          id: todoToEdit.id,
          todo,
        })
      );
      alert("Todo updated successfully");
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          todo,
        })
      );
      alert("Todo created successfully");
    }
    setTodo("");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        inputRef={topRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
        placeholder="Todo"
      />
      <Button type="submit" variant="contained" color="primary">
        {todoToEdit ? "Update Todo" : "Add Todo"}
      </Button>
      {todoToEdit && <Button onClick={onCancel}>Cancel</Button>}
    </form>
  );
};

export default TodoForm;
