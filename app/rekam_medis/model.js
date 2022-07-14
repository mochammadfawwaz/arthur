const mongoose = require('mongoose');

let rekam_medisSchema = mongoose.Schema({
    nama: {
        type: String,
        require: [true, 'Nama perawat harus diisi']
    },
    no_medis: {
        type: String,
        require: [true, 'Nomor medis harus diisi']
    },
    ph: {
        type: Number
    },
    volume: {
        type: Number
    }
}, { timestamps: true})

module.exports = mongoose.model('Rekam_medis', rekam_medisSchema)