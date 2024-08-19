const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is required'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
