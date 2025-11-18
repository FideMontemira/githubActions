const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

const crearUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { body } = req;
        const usuario = await Usuario.create(body);
        res.status(201).json(usuario); // 201 = "Created"
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al crear el usuario' });
    }
};


const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};


const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.update(req.body, { where: { id } });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.destroy({ where: { id } });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
