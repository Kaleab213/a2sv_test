import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  due_date: { type: String },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
