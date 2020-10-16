const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/route');
const dotenv = require('dotenv');

var cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//username: userxcess
//pwd: Fhekuc8XCxu0hpPQ
//db: expenseManager

mongoose.connect(
 process.env.MONGO_URI,
 {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
 },
 (err) => {
  if (err) {
   console.log(err);
  } else console.log('The database is connected');
 }
);

app.use('/api', authRoute);

app.listen(5000, () => {
 console.log('The server is live on port 5000');
});
