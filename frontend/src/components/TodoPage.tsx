/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [editedTask, setEditedTask] = useState<{ id: number; name: string } | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  const handleSave = async () => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    try {
      await api.post('/tasks', { name: newTaskName });
      await handleFetchTasks();
      handleClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {
          tasks.map((task, index) => (
            <Box key={index} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
              <TextField
                size="small"
                value={editedTask?.id === task.id ? editedTask.name : task.name}
                onChange={(e) => setEditedTask({ id: task.id, name: e.target.value })}
                fullWidth
                sx={{ maxWidth: 350 }}
              />
              <Box>
                <IconButton
                  color="success"
                  onClick={() => {
                    if (editedTask && editedTask.id === task.id) {
                      handleUpdate(task.id, editedTask.name);
                      setEditedTask(null);
                    }
                  }}
                  disabled={!editedTask || editedTask.id !== task.id || editedTask.name === task.name}
                >
                  <Check />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        }

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpen}>Ajouter une tâche</Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '20%', width: 300 }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Typography variant="h6">Ajouter une tâche</Typography>
              </Box>
              <TextField
                label="Nom"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={handleSave} variant="contained" color="primary">Confirmer</Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;
