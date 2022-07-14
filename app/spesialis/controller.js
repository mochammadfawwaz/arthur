const Spesialist = require('./model')

module.exports = {
    index: async(req, res) => {
        try{
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            // get data spesialis from database
            const spesialis = await Spesialist.find();

            res.render('admin/spesialis/view_spesialis', {
                spesialis,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Spesialis'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    },
    viewCreate : async(req, res) => {
        try {
            res.render('admin/spesialis/create_spesialis', {
                nama: req.session.user.nama,
                title: 'Halaman Tambah Spesialis'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    },
    actionCreate : async(req, res) => {
        try {
            const { name } = req.body;
            let spesialis = await Spesialist({ name });
            await spesialis.save();

            req.flash('alertMessage', "Berhasil tambah spesialist");
            req.flash('alertStatus', "success");

            res.redirect('/spesialis')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const spesialis = await Spesialist.findOne({ _id: id });

            res.render('admin/spesialis/edit_spesialis', {
                spesialis,
                nama: req.session.user.nama,
                title: 'Halaman Edit Spesialis'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    },

    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Spesialist.findOneAndUpdate({
                _id: id
            }, { name });

            req.flash('alertMessage', "Berhasil ubah spesialist");
            req.flash('alertStatus', "success");

            res.redirect('/spesialis')
        } catch (err) {
            req.flash('alertMessage', `aw ${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    },

    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Spesialist.findOneAndRemove({
                _id: id
            });
            
            req.flash('alertMessage', "Berhasil hapus spesialist");
            req.flash('alertStatus', "success");

            res.redirect('/spesialis');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/spesialis')
        }
    }
}