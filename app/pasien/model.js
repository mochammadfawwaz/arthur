const mongoose = require('mongoose');

let pasienSchema = mongoose.Schema({
    nama: {
        type: String,
        require: [true, 'Nama Pasien harus diisi']
    },
    no_medis: {
        type: String,
        require: [true, 'Nomor Medis pasien harus diisi']
    },
    nik: {
        type: Number,
        require: [true, 'NIK pasien harus diisi']
    },
    alamat: {
        type: String,
        require: [true, 'Alamat pasien harus diisi']
    },
    jenis_kelamin: {
        type: String,
        enum: ['Laki-laki', 'Perempuan'],
        default: 'Pria'
    },
    agama: {
        type: String
    },
    penyakit: {
        type: String
    },
    no_telepon: {
        type: String
    },
    dokters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dokter'
    }],
    perawats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perawat'
    }],
    rekam_medis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rekam_medis'
    }],
})

module.exports = mongoose.model('Pasien', pasienSchema)