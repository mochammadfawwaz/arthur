const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi']
    },
    nama: {
        type: String,
        require: [true, 'Nama harus diisi']
    },
    password: {
        type: String,
        require: [true, 'kata sandi harus diisi']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    no_telepon: {
        type: String,
        require: [true, 'kata sandi harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)