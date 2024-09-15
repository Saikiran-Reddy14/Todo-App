import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, fetchTodos, updateTodo } from "../redux/actions";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = ({ onEdit, topRef, onCancel }) => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    onCancel();
  };

  const handleEdit = (todo) => {
    onEdit(todo);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    topRef.current.focus();
  };

  const handleCheckboxChange = (id, completed, todo) => {
    dispatch(updateTodo({ id, completed: !completed, todo }));
    onCancel();
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            checked={todo.completed}
            onChange={() =>
              handleCheckboxChange(todo.id, todo.completed, todo.todo)
            }
            inputProps={{ "aria-label": "controlled" }}
          />
          <ListItemText
            primary={todo.todo}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          />
          {todo.completed ? (
            ""
          ) : (
            <IconButton onClick={() => handleEdit(todo)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton onClick={() => handleDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
