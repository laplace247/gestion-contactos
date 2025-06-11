const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true,
    maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'La empresa no puede exceder 100 caracteres'],
    default: ''
  }
}, {
  timestamps: true
});

// Índices para búsquedas rápidas
contactSchema.index({ email: 1 });
contactSchema.index({ name: 1 });

// Método para formato JSON
contactSchema.methods.toJSON = function() {
  const contact = this.toObject();
  return contact;
};

module.exports = mongoose.model('Contact', contactSchema);