const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');
const config = require('./config');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //integration of swagger

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);



//mongodb connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).send('Something went wrong!');
});

process.on('SIGINT', () => {
  console.log('Closing server...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});
