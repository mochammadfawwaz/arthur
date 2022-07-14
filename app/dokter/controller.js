const Dokter = require('./model')
const Departemen = require('../departemen/model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }

            // get data dokter from database
            const dokter = await Dokter.find().populate('departement')

            res.render('admin/dokter/view_dokter', {
                dokter,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Dokter'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const departement = await Departemen.find()

            res.render('admin/dokter/create_dokter', {
                nama: req.session.user.nama,
                title: 'Halaman Tambah Dokter',
                departement
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { nama, spesialis, no_telepon, departement } = req.body;
            let dokter = await Dokter({ nama, spesialis, no_telepon, departement });
            await dokter.save();

            req.flash('alertMessage', "Berhasil tambah dokter");
            req.flash('alertStatus', "success");

            res.redirect('/dokter')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter');
        }
    },    
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const dokter = await Dokter.findOne({ _id: id });
            const departement = await Departemen.find();

            res.render('admin/dokter/edit_dokter', {
                dokter,
                departement,
                nama: req.session.user.nama,
                title: 'Halaman Edit Dokter'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { nama, spesialis, no_telepon, departement } = req.body;

            await Dokter.findOneAndUpdate({
                _id: id
            }, { nama, spesialis, departement, no_telepon });

            req.flash('alertMessage', "Berhasil ubah dokter");
            req.flash('alertStatus', "success");

            res.redirect('/dokter')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter');
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Dokter.findOneAndRemove({
                _id: id
            });
            
            req.flash('alertMessage', "Berhasil hapus dokter");
            req.flash('alertStatus', "success");

            res.redirect('/dokter');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/dokter')
        }
    }
}