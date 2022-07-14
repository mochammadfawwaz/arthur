const mongoose = require('mongoose');

let dokterSchema = mongoose.Schema({
    nama: {
        type: String,
        require: [true, 'Nama dokter harus diisi']
    },
    spesialis: {
        type: String,
        require: [true, 'Speasialis dokter harus diisi']
    },
    no_telepon: {
        type: Number,
        require: [true, 'Nomor telepon dokter harus diisi']
    },
    departement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departemen'
    }],
}, { timestamps: true })

module.exports = mongoose.model('Dokter', dokterSchema)