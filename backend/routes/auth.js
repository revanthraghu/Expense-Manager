const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { registerValidation, loginValidation } = require('../validation');
const User = require('../models/User');

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

module.exports = router;
