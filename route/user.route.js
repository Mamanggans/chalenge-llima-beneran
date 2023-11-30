const express = require('express')
const route = express.Router()
const { GetAllAccount, UserPost, retrieveUserbyId, updateUserById, deleteUser} = require('../controller/user.controller')
const { CheckPost } = require('../middleware/middleware')

// retrieve user 
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *      - "CRUD User"
 *     summary: retrieve all users Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                      type: string
 */
route.get('/', GetAllAccount)


// Post User
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *      - "CRUD User"
 *     summary: Create a new User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               identity_type:
 *                 type: string
 *               address:
 *                 type: string
 *               identity_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
route.post('/', CheckPost, UserPost)



route.get('/:user_id', retrieveUserbyId)

// Update User
/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags:
 *      - "CRUD User"
 *     summary: Update an User by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
route.put('/:user_id', updateUserById)
// Delete
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *      - "CRUD User"
 *     summary: Delete an User by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
route.delete('/:user_id', deleteUser)


module.exports = route