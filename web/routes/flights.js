const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/flights
let offset = 0;
let limit = 10;


router.get('/', async (req, res) => {
    let querySearch = "SELECT * FROM flights LIMIT $1 OFFSET $2;";
    let actualOffset = offset;
    let values = [limit, actualOffset];

    if (req.query.page) {
        if (!isNaN(req.query.page)) {
            actualOffset = Number(req.query.page) * limit;
            values = [limit, actualOffset];
        }
    }

    if (req.query.id) {
        querySearch = 'SELECT * FROM flights WHERE flight_id = $1;';
        values = [!isNaN(req.query.id) ? Number(req.query.id) : 1185];
    }

    db.query(querySearch, values, (err, query) => res.json({ data: query.rows }))
});



module.exports = router;