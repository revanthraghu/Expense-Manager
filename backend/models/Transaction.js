const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
 moneyType: {
  type: String,
  required: true
 },
 transactionType: {
  type: String,
  required: true
 },
 category: {
  type: String,
  required: true
 },
 amount: {
  type: String,
  required: true
 },
 description: {
  type: String,
  required: true
 },
 date: {
  type: Date,
  required: true,
  default: Date.now
 },
 user_id: {
  type: Schema.Types.ObjectId,
  required: true
 }
});

module.exports = mongoose.model('Transactions', transactionSchema);
