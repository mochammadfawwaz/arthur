const Dokter = require('../dokter/model');
const Perawat = require('../perawat/model');
const Pasien = require('../pasien/model');

module.exports = {
    index: async(req, res) => {
        
        const dokter = await Dokter.countDocuments()
        const perawat = await Perawat.countDocuments()
        const pasien = await Pasien.countDocuments()
        
        try{
            res.render('index', {
                dokter,
                perawat,
                pasien,
                nama: req.session.user.nama,
                title: 'Halaman Dashboard'
            });
        } catch (err) {
            console.log(err);
        }
    }
}