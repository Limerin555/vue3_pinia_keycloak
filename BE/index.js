require('dotenv').config();
const cors = require('cors');
const express = require('express');

const port = process.env.PORT;

// Routes
const testRoutes = require('./routes/test');
const keycloakRoutes = require('./routes/keycloak');

const app = express();

app.use(express.json());
app.use(cors());

// Register routes
app.use('/api', testRoutes);
app.use('/api', keycloakRoutes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});