const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Returns a list of books
 *
 *   post:
 *     summary: Create a new book
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
 *         description: Book created
 */

router.get('/', getBooks);
router.post('/', createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
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
 *         description: Book updated
 *
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */

router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
