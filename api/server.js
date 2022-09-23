const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect('mongodb://127.0.0.1:27017/mern-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to database'))
  .catch(console.error);

const Todo = require('./models/Todo');

// to get all available todos in database, it returns a array of the todos
app.get('/todos', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

// to add new to do record to the collection, it returns the newly added record
app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save();
  res.json(todo);
});

// to delete a to do record from database, it returns the deleted record
app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

// to change the status of completion of to do record, it returns the updated record
app.put('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});
app.listen(3001, console.log('server stared at port 3001'));
