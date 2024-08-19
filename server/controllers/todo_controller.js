const Todo = require('../models/todo_schema');

const createTodo = (req, res) => {
  const newTodo = new Todo({
    userId: req.user.id, // Assumes user ID is set in the auth middleware
    title: req.body.title,
  });

  newTodo.save()
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const getTodos = (req, res) => {
  Todo.find({ userId: req.user.id })
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json({ message: 'Todo deleted' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
