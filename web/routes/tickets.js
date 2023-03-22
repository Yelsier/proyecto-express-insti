const express = require('express');
const router = express.Router();
const db = require("../db")

const countTickets = async () => {
    db.query("SELECT count(*) FROM tickets", (err, query) => {
        return query.rows
    })
}

//las rutas empiezan desde /api/tickets
router.get('/', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 10", (err, query) => {
        res.json({ hola: "a" });
    })
});

router.post('/', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 10", (err, query) => {
        res.json(query.rows);
    })
});

router.get('/:id', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});

router.put('/:id', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});

router.delete('/:id', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 5", (err, query) => {
        res.json({ data: query.rows });
    })
});


module.exports = router;