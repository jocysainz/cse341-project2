const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Authenticate with GitHub OAuth.
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication.
 */
router.get('/github', passport.authenticate('github'));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback.
 *     responses:
 *       302:
 *         description: Redirects after successful authentication.
 */
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out of the application.
 *     responses:
 *       302:
 *         description: Redirects to the home page after logout.
 */
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
