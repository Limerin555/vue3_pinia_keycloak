require('dotenv').config();
const cors = require('cors');
const express = require('express');

const port = process.env.PORT;

const testRoutes = require('./routes/test');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', testRoutes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});