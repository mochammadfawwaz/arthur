const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    viewSignIn: async(req, res) => {
        try{
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus }
            // get data category from database
            if(req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin', {
                    alert,
                    title: 'Halaman Masuk'
                });
            } else {
                res.redirect('/dashboard')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/')
        }
    },

    actionSignIn: async(req, res) => {
        try {
            const { email, password } = req.body
            const check = await User.findOne({ email: email })

            if(check) {
                if(check.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if(checkPassword) {
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            nama: check.nama
                        }
                        res.redirect('/dashboard')
                    } else {
                        req.flash('alertMessage', `Kata sandi yang anda inputkan salah`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/')
                    }
                } else {
                    req.flash('alertMessage', `Mohon maaf status user anda belum aktif`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/')
                }
            } else {
                req.flash('alertMessage', `Email yang anda inputkan salah`);
                req.flash('alertStatus', 'danger');
                res.redirect('/')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/')
        }
    },
    actionLogout: async (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}