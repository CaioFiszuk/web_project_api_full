const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?[^\s\/]+\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/.test(v);
      },
      message: props => `${props.value} não é uma URL válida!`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
