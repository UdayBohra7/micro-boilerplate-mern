const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const routes = require('./routes/v1');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/v1', routes);

// Error handler
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  console.error('Error occurred:', err);
  res.status(statusCode || 500).json({
    success: false,
    message: message || 'Internal Server Error',
  });
});

module.exports = app;
