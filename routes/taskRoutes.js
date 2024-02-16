import express from 'express';
import data from '../data/data.js';
import Task from '../models/taskModel.js';

const taskRouter = express.Router();

taskRouter.get('/tasks', async (req, res) => {
  res.status(200).send(data.tasks);
});

taskRouter.get('/tasks/:id', (req, res) => {
  const task = data.tasks.find((p) => p.id === req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send({ message: 'Task Not Found' });
  }
});

taskRouter.post(
  '/tasks',
  expressAsyncHandler(async (req, res) => {
    const newTask = new Task({
      due_date: req.body.due_date,
      description: req.body.description,
      title: req.body.name,
    });
    const task = await newTask.save();
    res.status(201).send({ message: 'New Task Created', task });
  })
);

taskRouter.update(
  '/tasks/:id',
  expressAsyncHandler(async (req, res) => {
    const newid = req.params.id;
    const newTask = new Task({
      description: req.body.description,
      name: req.body.name,
    });
    const task = await newTask.update(newid);
    res.status(200).send({ message: 'The task is updated', task });
  })
);

taskRouter.delete(
  '/tasks/:id',
  expressAsyncHandler(async (req, res) => {
    const newid = req.params.id;
    const task = await newTask.delete(newid);
    res.status(200).send({ message: 'The task is deleted', task });
  })
);

export default taskRouter;
