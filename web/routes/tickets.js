const express = require('express');
const router = express.Router();
const db = require("../db")


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

    db.query("SELECT * FROM tickets ORDER BY ticket_no DESC LIMIT $1 OFFSET $2", [limite, page * limite], (err, query) => {
        res.json({ tickets: query.rows, pages });
    })
});

router.get('/nextID', async (req, res) => {
    db.query("SELECT MAX(ticket_no) FROM tickets", (err, query) => {
        res.send(query.rows[0])
    })
})

router.post('/', async (req, res) => {
    db.query("SELECT * FROM bookings WHERE book_ref = $1", [req.body.book_ref], (errBR, queryBR) => {
        if (queryBR.rowCount == 0) {
            res.json({ error: "book_ref" })
            return
        } else {
            const query = 'INSERT into tickets VALUES ($1, $2, $3, $4, $5)'
            db.query(query, [req.body.ticket_no, req.body.book_ref, req.body.passenger_id, req.body.passenger_name, JSON.stringify(req.body.contact_data)], (err, queryres) => {
                if (err) res.status(500).json({ error: err })
                else res.json({ status: "ok" })
            })
        }
    })
});

router.get('/:id', async (req, res) => {
    db.query("SELECT * FROM tickets INNER JOIN bookings ON tickets.book_ref = bookings.book_ref WHERE ticket_no=$1", [req.params.id], (err, query) => {
        res.json(query.rows ? query.rows[0] : {});
    })
});

router.put('/:id', async (req, res) => {
    db.query("SELECT * FROM bookings WHERE book_ref = $1", [req.body.book_ref], (errBR, queryBR) => {
        if (queryBR.rowCount == 0) {
            res.json({ error: "book_ref" })
            return
        } else {
            const query = 'UPDATE tickets SET passenger_id = $1, passenger_name = $2, book_ref=$3, contact_data = $4 WHERE ticket_no = $5'
            let contact_data = {}
            req.body.contact_phone != "" ? contact_data["phone"] = req.body.contact_phone : null
            req.body.contact_email != "" ? contact_data["email"] = req.body.contact_email : null
            db.query(query, [req.body.passenger_id, req.body.passenger_name, req.body.book_ref, JSON.stringify(contact_data), req.params.id], (err, query) => {
                if (err) res.status(500).json({ error: err })
                else res.json({ status: "ok" })
            })
        }
    })
});

router.delete('/:id', async (req, res) => {

    db.query("DELETE FROM boarding_passes WHERE ticket_no=$1", [req.params.id], (err, query) => {
        if (err) console.log(err);
    })

    db.query("DELETE FROM ticket_flights WHERE ticket_no=$1", [req.params.id], (err, query) => {
        if (err) console.log(err);
    })

    db.query("DELETE FROM tickets WHERE ticket_no=$1", [req.params.id], (err, query) => {
        res.json({ status: "ok" });
    })
});


module.exports = router;