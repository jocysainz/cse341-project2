const express = require('express');
const router = express.Router();
const {
  getAuthors,
  createAuthor,
updateAuthor,
deleteAuthor,
} = require('../controllers/authorController');

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: Returns a list of authors.
 */
router.get('/', getAuthors);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Add a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - birthPlace
 *             properties:
 *               birthPlace:
 *                 type: string
 *               deathYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Author created
 */
router.post('/', createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
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
 *               birthPlace:
 *                 type: string
 *               deathYear:
 *                 type: number
 *     responses:
 *       200:
 *         description: Author updated
 */
router.put('/:id', updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted
 */
router.delete('/:id', deleteAuthor);

module.exports = router;

