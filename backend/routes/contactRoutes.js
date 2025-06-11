const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contacts - Obtener todos los contactos
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/contacts - Obteniendo todos los contactos');
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    console.log(`Encontrados ${contacts.length} contactos`);
    
    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Error obteniendo contactos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    });
  }
});

// GET /api/contacts/:id - Obtener contacto por ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`GET /api/contacts/${req.params.id}`);
    
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
    console.error('Error obteniendo contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contacto',
      error: error.message
    });
  }
});

// POST /api/contacts - Crear nuevo contacto
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/contacts - Datos recibidos:', req.body);
    
    const { name, email, phone, company } = req.body;
    
    // Validación básica
    if (!name || !email || !phone) {
      console.log('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y teléfono son requeridos',
        errors: {
          name: !name ? 'Nombre es requerido' : null,
          email: !email ? 'Email es requerido' : null,
          phone: !phone ? 'Teléfono es requerido' : null
        }
      });
    }
    
    // Verificar si el email ya existe
    const existingContact = await Contact.findOne({ email: email.toLowerCase() });
    if (existingContact) {
      console.log('Email ya existe:', email);
      return res.status(400).json({
        success: false,
        message: 'Ya existe un contacto con este email'
      });
    }
    
    // Crear nuevo contacto
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company ? company.trim() : ''
    };
    
    console.log('Creando contacto con datos:', contactData);
    
    const contact = new Contact(contactData);
    const savedContact = await contact.save();
    
    console.log('Contacto creado exitosamente:', savedContact._id);
    
    res.status(201).json({
      success: true,
      data: savedContact,
      message: 'Contacto creado exitosamente'
    });
    
  } catch (error) {
    console.error('Error creando contacto:', error);
    
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors
      });
    }
    
    // Manejar error de duplicado
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un contacto con este email'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// PUT /api/contacts/:id - Actualizar contacto
router.put('/:id', async (req, res) => {
  try {
    console.log(`PUT /api/contacts/${req.params.id}`, req.body);
    
    const { name, email, phone, company } = req.body;
    
    // Validación básica
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y teléfono son requeridos'
      });
    }
    
    // Verificar si el email ya existe en otro contacto
    const existingContact = await Contact.findOne({ 
      email: email.toLowerCase(), 
      _id: { $ne: req.params.id } 
    });
    
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe otro contacto con este email'
      });
    }
    
    const updateData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company ? company.trim() : ''
    };
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }
    
    console.log('Contacto actualizado:', updatedContact._id);
    
    res.json({
      success: true,
      data: updatedContact,
      message: 'Contacto actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error actualizando contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar contacto',
      error: error.message
    });
  }
});

// DELETE /api/contacts/:id - Eliminar contacto
router.delete('/:id', async (req, res) => {
  try {
    console.log(`DELETE /api/contacts/${req.params.id}`);
    
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }
    
    console.log('Contacto eliminado:', deletedContact._id);
    
    res.json({
      success: true,
      data: deletedContact,
      message: 'Contacto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar contacto',
      error: error.message
    });
  }
});

module.exports = router;