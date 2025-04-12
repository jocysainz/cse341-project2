const express = require('express');
const router = express.Router();
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
}

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books.
 *     responses:
 *       200:
 *         description: Returns a list of books.
 */
router.get('/', getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book (protected).
 *     security:
 *       - GitHubAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               pages:
 *                 type: number
 *               publishedYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created.
 */
router.post('/', ensureAuthenticated, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book (protected).
 *     security:
 *       - GitHubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               pages:
 *                 type: number
 *               publishedYear:
 *                 type: number
 *     responses:
 *       200:
 *         description: Book updated.
 */
router.put('/:id', ensureAuthenticated, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book (protected).
 *     security:
 *       - GitHubAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted.
 */
router.delete('/:id', ensureAuthenticated, deleteBook);

module.exports = router;
