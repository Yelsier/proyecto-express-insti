const express = require('express');
const router = express.Router();
const db = require("../db")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const countTickets = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) FROM tickets", (err, query) => {
            resolve(query.rows[0].count)
        })
    })
}

//las rutas empiezan desde /api/tickets
router.get('/', async (req, res) => {
    const limite = 10
    const pages = Math.ceil(await countTickets() / limite)
    const page = req.query.page ? req.query.page - 1 : 0

    db.query("SELECT * FROM tickets LIMIT $1 OFFSET $2", [limite, page * limite], (err, query) => {
        res.json({ tickets: query.rows, pages });
    })
});

router.post('/', async (req, res) => {
    db.query("SELECT * FROM tickets LIMIT 10", (err, query) => {
        res.json(query.rows);
    })
});

router.get('/:id', async (req, res) => {
    db.query("SELECT * FROM tickets INNER JOIN bookings ON tickets.book_ref = bookings.book_ref WHERE ticket_no=$1", [req.params.id], (err, query) => {
        res.json(query.rows ? query.rows[0] : {});
    })
});

router.put('/:id', jsonParser, async (req, res) => {
    /**
     * req type
     * {
     *  passenger_id
     *  passenger_name
     *  contact_phone
     *  contact_email
     *  total_amount
     * }
     */
    console.log(req.body);
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