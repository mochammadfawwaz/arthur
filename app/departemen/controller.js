const Category = require('./model')

module.exports = {
    index: async(req, res) => {
        try{
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            // get data category from database
            const category = await Category.find();

            res.render('admin/category/view_category', {
                category,
                alert,
                nama: req.session.user.nama,
                title: 'Halaman Departemen'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    },
    viewCreate : async(req, res) => {
        try {
            res.render('admin/category/create_category', {
                nama: req.session.user.nama,
                title: 'Halaman Tambah Departemen'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    },
    actionCreate : async(req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({ name });
            await category.save();

            req.flash('alertMessage', "Berhasil tambah departement");
            req.flash('alertStatus', "success");

            res.redirect('/departemen')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findOne({ _id: id });

            res.render('admin/category/edit_category', {
                category,
                nama: req.session.user.nama,
                title: 'Halaman Edit Departemen'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    },

    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.findOneAndUpdate({
                _id: id
            }, { name });

            req.flash('alertMessage', "Berhasil ubah departement");
            req.flash('alertStatus', "success");

            res.redirect('/departemen')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    },

    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Category.findOneAndRemove({
                _id: id
            });
            
            req.flash('alertMessage', "Berhasil hapus departement");
            req.flash('alertStatus', "success");

            res.redirect('/departemen');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/departemen')
        }
    }
}