const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes'); // OAuth routes
const { swaggerUi, swaggerSpec } = require('./swagger');
const config = require('./config');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Authentication required' });
}

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/auth', authRoutes);


/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Returns the authenticated user's profile.
 *     security:
 *       - GitHubAuth: []
 *     responses:
 *       200:
 *         description: User profile data.
 *       401:
 *         description: Authentication required.
 */
app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

mongoose.connect(config.MONGODB_URL)
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
