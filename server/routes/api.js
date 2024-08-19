const express = require('express');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'default_secret';

const {
  createData,
  readData,
  updateData,
  deleteData,
  login,
} = require('../controllers/user_controller');

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo_controller');

const auth = (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = auth.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' + err });
  }
};

const router = express.Router();

//Preflight requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});

//User routes
router
  .post('/signup', createData)
  .post('/login', login);


//Protected routes
router.use(auth);

//user related routes
router
  .get('/status', (req, res) => {
    res.status(200).json({ message: 'You are authorized!' });
  })
  .get('/users', readData)
  .put('/user/:id', updateData)
  .delete('/user/:id', deleteData)

//todo related routes
router
  .post('/todos', createTodo)
  .get('/todos', getTodos)
  .put('/todos/:id', updateTodo)
  .delete('/todos/:id', deleteTodo);

module.exports = router;
