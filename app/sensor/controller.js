const RekamMedis = require("../rekam_medis/model");

module.exports = {
  query: async (req, res) => {
    try {
      const payload = req.body;

      let rekam_medis = new RekamMedis(payload);

      await rekam_medis.save();

      res.status(201).json({
        data: rekam_medis,
      });
    } catch (err) {
      if (err && err.name === "Validation Error") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
    }
  },
  rekam: async (req, res) => {
    try {
      const fromDatabase = await RekamMedis.find().select("_id ph volume"); // function for only get data ( _id, name, status, category, thumbnail )
      res.status(200).json({ data: fromDatabase });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
