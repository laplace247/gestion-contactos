const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/contactsDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/contacts', contactRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
      message: 'API REST de Gestión de Contactos - AtenciónTotal',
      version: '1.0.0',
      endpoints: {
        'GET /api/contacts': 'Obtener todos los contactos',
        'POST /api/contacts': 'Crear nuevo contacto',
        'GET /api/contacts/:id': 'Obtener contacto por ID',
        'PUT /api/contacts/:id': 'Actualizar contacto',
        'DELETE /api/contacts/:id': 'Eliminar contacto'
      }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API REST corriendo en http://localhost:${PORT}`);
});