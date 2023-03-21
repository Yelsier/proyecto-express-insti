const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/flights
let offset = 0;
let limit = 10;
router.get('/', async (req, res) => {

    let actualOffset = offset;
    if ("page" in req.params) {
        if (!isNaN(req.params.page)) {
            actualOffset = req.params.page * limit;
        }
    }

    let querySearch = "SELECT * FROM flights LIMIT $1 OFFSET $2;";
    db.query(querySearch, [limit, actualOffset], (err, query) => {
        res.json({ data: query.rows });
    })
});


router.get('/:id', async (req, res) => {
    let querySearch = 'SELECT * FROM flights WHERE ID = $1;';
    db.query(querySearch, [req.params.pepe], (err, query) => {
        res.json({ data: query.rows });
    })
});

router.get('/:limit/:offset', async (req, res) => {
    let querySearch = 'SELECT * FROM flights LIMIT $1 OFFSET $2;';
    db.query(querySearch, [req.params.limit, req.params.offset], (err, query) => {
        res.json({ data: query.rows });
    })
});

module.exports = router;