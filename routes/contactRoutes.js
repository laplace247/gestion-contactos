const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Obtener todos los contactos
router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener contactos',
        error: error.message
      });
    }
});

// Obtener un contacto por ID
router.get('/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contacto no encontrado'
        });
      }
      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener contacto',
        error: error.message
      });
    }
});

// Crear un nuevo contacto
router.post('/', async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json({
        success: true,
        message: 'Contacto creado exitosamente',
        data: newContact
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          message: 'El email ya existe'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Error al crear contacto',
          error: error.message
        });
      }
    }
});

// Actualizar un contacto
router.put('/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contacto no encontrado'
        });
      }
      res.json({
        success: true,
        message: 'Contacto actualizado exitosamente',
        data: contact
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al actualizar contacto',
        error: error.message
      });
    }
});

// Eliminar un contacto
router.delete('/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contacto no encontrado'
        });
      }
      res.json({
        success: true,
        message: 'Contacto eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar contacto',
        error: error.message
      });
    }
});

module.exports = router;