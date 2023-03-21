const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/boarding_passes
router.get('/', (req, res) => {
    db.query("SELECT * FROM boarding_passes LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});

module.exports = router;