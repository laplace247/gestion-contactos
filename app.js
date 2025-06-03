const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/contactsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/contacts', contactRoutes);

app.listen(3000, () => console.log('API REST corriendo en http://localhost:3000'));