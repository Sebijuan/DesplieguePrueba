const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/api/users', userController.getAllUsers);

// Crear un usuario
router.post('/api/users', userController.createUser);

// Actualizar un usuario
router.put('/api/users/:id', userController.updateUser);

// Eliminar un usuario
router.delete('/api/users/:id', userController.deleteUser);

module.exports = router;
