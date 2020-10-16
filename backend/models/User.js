const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
 name: {
  type: String,
  required: true,
  min: 6,
  max: 255,
  trim: true
 },
 email: {
  type: String,
  required: true,
  max: 255,
  min: 6
 },
 password: {
  type: String,
  required: true,
  max: 1024,
  min: 6
 },
 balance: {
  type: Number,
  default: 0
 },
 income: {
  type: Number,
  default: 0
 },
 expenses: {
  type: Number,
  default: 0
 }
});

module.exports = mongoose.model('User', userSchema);
