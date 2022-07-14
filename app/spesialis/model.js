const mongoose = require('mongoose');

let spesialistSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama kategori harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('Spesialist', spesialistSchema)