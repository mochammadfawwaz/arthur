const mongoose = require('mongoose');

let perawatSchema = mongoose.Schema({
    nama: {
        type: String,
        require: [true, 'Nama perawat harus diisi']
    },
    spesialis: {
        type: String,
        require: [true, 'Speasialis perawat harus diisi']
    },
    no_telepon: {
        type: Number,
        require: [true, 'Nomor telepon perawat harus diisi']
    },
    departement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departemen'
    }],
}, { timestamps: true })

module.exports = mongoose.model('Perawat', perawatSchema)