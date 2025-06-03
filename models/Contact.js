const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Contact', ContactSchema);