const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toDoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: String,
    default: Date.now()
  }
});

const Todo = mongoose.model('Todo', toDoSchema);
module.exports = Todo;
