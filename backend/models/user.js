const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?[^\s\/]+\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/.test(v);
      },
      message: props => `${props.value} não é uma URL válida!`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} não é um email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

module.exports = mongoose.model('user', userSchema);