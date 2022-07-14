const Pasien = require('./model')
const Dokter = require('../dokter/model')
const Rekam_medis = require('../rekam_medis/model')
const Perawat = require('../perawat/model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }

            // get data pasien from database
            const pasien = await Pasien.find().populate('dokters').populate('perawats')
            console.log("data view: ", pasien)

            res.render('admin/pasien/view_pasien', {
                pasien,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Pasien'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const dokter = await Dokter.find()
            const perawat = await Perawat.find()

            res.render('admin/pasien/create_pasien', {
                dokter,
                perawat,
                nama: req.session.user.nama,
                title: 'Halaman Tambah Pasien'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { nama, no_medis, nik, alamat, jenis_kelamin, agama, penyakit, no_telepon, dokters, perawats } = req.body;
            const pasien = new Pasien({ nama, no_medis, nik, alamat, jenis_kelamin, agama, penyakit, no_telepon, dokters, perawats });
            await pasien.save();

            req.flash('alertMessage', "Berhasil tambah pasien");
            req.flash('alertStatus', "success");

            res.redirect('/pasien')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien');
        }
    },    
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const dokter = await Dokter.find()
            const perawat = await Perawat.find()
            const pasien = await Pasien.findOne({ _id: id }).populate('dokters').populate('perawats');
            console.log("passiens: ", pasien)

            res.render('admin/pasien/edit_pasien', {
                pasien,
                dokter,
                perawat,
                nama: req.session.user.nama,
                title: 'Halaman Edit Pasien'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { nama, nik, no_medis, alamat, jenis_kelamin, agama, penyakit, no_telepon, dokters, perawats } = req.body;

            await Pasien.findOneAndUpdate({
                _id: id
            }, { nama, nik, no_medis, alamat, jenis_kelamin, agama, penyakit, no_telepon, dokters, perawats });

            req.flash('alertMessage', "Berhasil ubah pasien");
            req.flash('alertStatus', "success");

            res.redirect('/pasien')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien');
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Pasien.findOneAndRemove({
                _id: id
            });
            
            req.flash('alertMessage', "Berhasil hapus pasien");
            req.flash('alertStatus', "success");

            res.redirect('/pasien');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien')
        }
    },
    viewDetail: async(req, res) => {
        try {
            const { id } = req.params;
            const dokter = await Dokter.find()
            const perawat = await Perawat.find()
            const rekam_medis = await Rekam_medis.find();
            const pasien = await Pasien.findOne({ _id: id }).populate('dokters').populate('perawats').populate('rekam_medis');
            console.log("data: ",pasien)

            res.render('admin/pasien/detail_pasien', {
                pasien,
                dokter,
                perawat,
                rekam_medis,
                nama: req.session.user.nama,
                title: 'Halaman Edit Pasien'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/pasien');
        }
    },
}