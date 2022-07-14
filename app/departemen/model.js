const mongoose = require('mongoose');

let departemenSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama kategori harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('Departemen', departemenSchema)