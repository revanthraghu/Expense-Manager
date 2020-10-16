const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { registerValidation, loginValidation } = require('../validation');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const router = express.Router();

dotenv.config();

router.post('/register', async (req, res) => {
 const { error } = registerValidation(req.body);
 if (error) {
  return res.status(400).send(error.details[0].message);
 }

 const emailExists = await User.findOne({ email: req.body.email });
 if (emailExists) {
  return res.status(400).send('email already registered');
 }
 try {
  const hashedPassword = await bcrypt.hash(
   req.body.password,
   await bcrypt.genSalt(10)
  );
  const user = new User({
   name: req.body.name,
   email: req.body.email,
   password: hashedPassword
  });

  const savedUser = await user.save();
  res.send(savedUser);
 } catch (err) {
  res.status(400).send(err);
 }
});

router.post('/login', async (req, res) => {
 const { error } = loginValidation(req.body);
 if (error) {
  return res.status(400).send(error.details[0].message);
 }
 try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
   return res.status(400).send('Email not found');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Wrong password');

  res.send(user);
 } catch (err) {
  return res.status(400).send(err.message);
 }
});

router.get('/transactions/', async (req, res) => {
 try {
  if (!req.query.user) {
   return res.status(400).send('Missing user query');
  }
  const sort = req.query.sort === 'asc' ? 1 : -1;
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const filter =
   req.query.filter === 'expense'
    ? 'Expense'
    : req.query.filter === 'income'
    ? 'Income'
    : null;

  const search_params = { user_id: mongoose.Types.ObjectId(req.query.user) };
  if (filter) {
   search_params['transactionType'] = filter;
  }

  let transactions = await Transaction.find(search_params)
   .sort({ date: sort })
   .skip((page - 1) * limit)
   .limit(limit);
  const count = await Transaction.countDocuments(search_params).exec();
  const totalPages = Math.ceil(count / limit);
  res.status(200).json({ transactions, totalPages, page, limit });
 } catch (err) {
  res.status(400).send(err.message);
 }
});

router.post('/transactions/add', async (req, res) => {
 let user_id = mongoose.Types.ObjectId(req.body['user_id']);
 let amount = Number(req.body.amount);
 try {
  const user = await User.findOne({ _id: user_id });
  if (req.body.transactionType === 'Expense') {
   user.expenses += amount;
   user.balance -= amount;
  } else if (req.body.transactionType === 'Income') {
   user.income += amount;
   user.balance += amount;
  }
  user.save();
  const new_transaction = {
   moneyType: req.body.moneyType,
   user_id,
   category: req.body.category,
   transactionType: req.body.transactionType,
   amount,
   description: req.body.description,
   date: req.body.date
  };
  Transaction.create(new_transaction).then(() =>
   res.status(200).send({
    ...new_transaction,
    balance: user.balance,
    income: user.income,
    expenses: user.expenses
   })
  );
 } catch (err) {
  res.status(400).send(err.message);
 }
});

router.delete('/transactions/delete', async (req, res) => {
 if (!req.body['_id'] || !req.body['user_id']) {
  return res
   .status(400)
   .send(
    'One or more body params missing. Required: transaction "_id" and "user_id"'
   );
 }
 let transaction_id = mongoose.Types.ObjectId(req.body['_id']);
 let user_id = mongoose.Types.ObjectId(req.body['user_id']);

 try {
  let user = await User.findOne({ _id: user_id });
  let transaction = await Transaction.findOne({ _id: transaction_id });
  if (transaction) {
   if (transaction.transactionType === 'Income') {
    user.income -= transaction.amount;
    user.balance = user.income - user.expenses;
   } else if (transaction.transactionType === 'Expense') {
    user.expenses -= transaction.amount;
    user.balance = user.income - user.expenses;
   }
   user.save();
   await Transaction.deleteOne({ _id: transaction_id });
   res
    .status(200)
    .json({
     ...transaction,
     balance: user.balance,
     income: user.income,
     expenses: user.expenses
    });
  } else {
   res.status(400).send('Transaction not found');
  }
 } catch (error) {
  res.status(400).send(error.message);
 }
});

router.get('/transactions/latest', async (req, res) => {
 try {
  if (!req.query.user) {
   return res.status(400).send('Missing user query');
  }
  let latest = await Transaction.find({
   user_id: mongoose.Types.ObjectId(req.query.user)
  })
   .sort({ date: -1 })
   .limit(5);
  res.status(200).json(latest);
 } catch (err) {
  res.status(400).send(err.message);
 }
});

module.exports = router;
