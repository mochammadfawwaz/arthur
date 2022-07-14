const Pasien = require('./model')
const Dokter = require('../dokter/model')
const Perawat = require('../perawat/model')
const Rekam_medis = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }

            // get data pasien from database
            const pasien = await Pasien.find().populate('dokters').populate('perawats')
            console.log("data view rekam medis: ", pasien)

            res.render('admin/rekam_medis/view_rekam_medis', {
                pasien,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Rekam Medis'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/rekam-medis')
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const dokter = await Dokter.find()
            const perawat = await Perawat.find()
            const pasien = await Pasien.findOne({ _id: id }).populate('dokters').populate('perawats');
            console.log("passiens: ", pasien)

            res.render('admin/rekam_medis/edit_rekam_medis', {
                pasien,
                dokter,
                perawat,
                nama: req.session.user.nama,
                title: 'Halaman Edit Rekam Medis'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/rekam-medis');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { nama, no_medis, ph, volume } = req.body;

            await Pasien.findOneAndUpdate({
                _id: id
            }, { nama, no_medis, ph, volume });

            req.flash('alertMessage', "Berhasil ubah pasien");
            req.flash('alertStatus', "success");

            res.redirect('/rekam-medis')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/rekam-medis');
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

            res.redirect('/rekam-medis');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/rekam-medis')
        }
    },
    viewDetailPasien: async(req, res) => {
        try {
            const { id } = req.params;
            const dokter = await Dokter.find()
            const perawat = await Perawat.find()
            const pasien = await Pasien.findOne({ _id: id }).populate('dokters').populate('perawats');
            console.log("passiens: ", pasien)

            res.render('admin/rekam_medis/detail_rekam_medis', {
                pasien,
                dokter,
                perawat,
                nama: req.session.user.nama,
                title: 'Halaman Edit Rekam Medis'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/rekam-medis');
        }
    },

    // API
    data: async (req, res, next) => {
        try {
            const payload = req.body

            let rekam_medis = new Rekam_medis(payload)

            await Rekam_medis.save()

            res.status(201).json({
                data: rekam_medis
            })
        } catch (err) {
            if(err && err.name === "Validation Error") {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err)
        }
    }
}