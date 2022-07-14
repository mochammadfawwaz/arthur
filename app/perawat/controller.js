const Perawat = require('./model')
const Departemen = require('../departemen/model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }

            // get data perawat from database
            const perawat = await Perawat.find().populate('departement')

            res.render('admin/perawat/view_perawat', {
                perawat,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Perawat'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const departement = await Departemen.find()

            res.render('admin/perawat/create_perawat', {
                nama: req.session.user.nama,
                departement,
                title: 'Halaman Tambah Perawat'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { nama, spesialis, departement, no_telepon } = req.body;
            let perawat = await Perawat({ nama, departement, spesialis, no_telepon });
            await perawat.save();

            req.flash('alertMessage', "Berhasil tambah perawat");
            req.flash('alertStatus', "success");

            res.redirect('/perawat')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat');
        }
    },    
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const perawat = await Perawat.findOne({ _id: id });
            const departement = await Departemen.find()

            res.render('admin/perawat/edit_perawat', {
                perawat,
                departement,
                nama: req.session.user.nama,
                title: 'Halaman Edit Perawat'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat');
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { nama, spesialis, departement, no_telepon } = req.body;

            await Perawat.findOneAndUpdate({
                _id: id
            }, { nama, spesialis, departement, no_telepon });

            req.flash('alertMessage', "Berhasil ubah perawat");
            req.flash('alertStatus', "success");

            res.redirect('/perawat')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat');
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Perawat.findOneAndRemove({
                _id: id
            });
            
            req.flash('alertMessage', "Berhasil hapus perawat");
            req.flash('alertStatus', "success");

            res.redirect('/perawat');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/perawat')
        }
    }
}