const { Router } = require('express');
const { check } = require('express-validator');

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarios');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - pass
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del usuario.
 *         nombre:
 *           type: string
 *           description: El nombre del usuario.
 *         email:
 *           type: string
 *           description: El email del usuario (debe ser único).
 *         pass:
 *           type: string
 *           description: La contraseña del usuario (mínimo 6 caracteres).
 *       example:
 *         id: 1
 *         nombre: "Jane Doe"
 *         email: "jane.doe@example.com"
 *         pass: "password123"
 *   tags:
 *     - name: Usuarios
 *       description: API para gestionar usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error en el servidor.
 *
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *             example:
 *               nombre: "Nuevo Usuario"
 *               email: "nuevo@correo.com"
 *               pass: "passSeguro123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/', obtenerUsuarios);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
  ],
  crearUsuario
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *             example:
 *               nombre: "Usuario Actualizado"
 *               email: "actualizado@correo.com"
 *               pass: "nuevaPass456"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Error de validación.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 *
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/:id', [
    validarJWT, 
    check('id', 'No es un ID válido').isInt(),
], actualizarUsuario);
router.delete('/:id', [
    validarJWT, 
    check('id', 'No es un ID válido').isInt(),
], eliminarUsuario);

module.exports = router;
