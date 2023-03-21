const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/flights
router.get('/', async (req, res) => {
    db.query("SELECT * FROM flights LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});

module.exports = router;