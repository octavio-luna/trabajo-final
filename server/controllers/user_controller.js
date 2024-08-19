'use strict';

const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'default_secret';

// Crear nuevo usuario
const createData = (req, res) => {
  User.create(req.body)
    .then((data) => {
      console.log('New User Created!', data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else if (err.code === 11000) { // Duplicate key error
        console.error('Duplicate key error!', err);
        res.status(409).json({ message: 'Email already exists' });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

// Leer todos los usuarios
const readData = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

// Actualizar usuario
const updateData = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('User updated!');
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

// Eliminar usuario
const deleteData = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('User not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('User removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'User or password incorrect' });
      } else if (data.password !== req.body.password) {
        res.status(401).json({ message: 'User or password incorrect' });
      } else {
              // Generate token
      const token = jwt.sign({ id: data._id }, secret, { expiresIn: '1h' });

      res.status(200).json({ token });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createData,
  readData,
  updateData,
  deleteData,
  login,
};
