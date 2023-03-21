const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/tickets
router.get('/', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});

module.exports = router;