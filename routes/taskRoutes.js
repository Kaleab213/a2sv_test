import express from 'express';
import data from '../data/data.js';
import Task from '../models/taskModel.js';

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
  res.status(200).send(data.tasks);
});

taskRouter.get('/:id', (req, res) => {
  const task = data.tasks.find((p) => p.id === req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send({ message: 'Task Not Found' });
  }
});

taskRouter.post(
  '/',
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
  '/:id',
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

export default taskRouter;
