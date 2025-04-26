import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  Paper,
  Stack
} from '@mui/material';

const TodoContainer = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      setTodos(JSON.parse(todostring));
    }
  }, []);

  const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    const toEdit = todos.find(t => t.id === id);
    setTodo(toEdit.todo);
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleAdd = () => {
    if (!todo.trim()) return;
    const newTodos = [...todos, { id: uuidv4(), todo, iscompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveTodos(newTodos);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, iscompleted: !t.iscompleted } : t);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completedCount = todos.filter(t => t.iscompleted).length;
  const remainingCount = todos.length - completedCount;

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add a Todo
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField
          fullWidth
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          label="Enter your todo..."
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControlLabel
          control={<Checkbox checked={showFinished} onChange={() => setShowFinished(!showFinished)} />}
          label="Show Finished Todos"
        />
        <Typography variant="body1">
          ✅ Completed: {completedCount} &nbsp;&nbsp; 🕒 Remaining: {remainingCount}
        </Typography>
      </Stack>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Your Todos
      </Typography>

      <Stack spacing={2}>
        {todos.length === 0 && (
          <Typography color="text.secondary">No todos to display</Typography>
        )}
        {todos.map(item => (
          (!item.iscompleted || showFinished) && (
            <Paper key={item.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Checkbox
                  checked={item.iscompleted}
                  onChange={() => handleCheckbox(item.id)}
                />
                <Typography sx={{ textDecoration: item.iscompleted ? 'line-through' : 'none', color: item.iscompleted ? 'gray' : 'black' }}>
                  {item.todo}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="info" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Stack>
            </Paper>
          )
        ))}
      </Stack>
    </Box>
  );
};

export default TodoContainer;