const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/flights
let offset = 0;
let limit = 10;


const validateId = (id, totalRows) => id >= 1 && id <= totalRows;

const getTotalFlights = async () => {
    let querySearch = "SELECT COUNT(*) FROM flights;";

    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].count));
        });
    });
};


router.get('/', async (req, res) => {
    let totalFlights = await getTotalFlights();
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
        if (validateId(req.query.id, totalFlights)) {
            querySearch = 'SELECT * FROM flights WHERE flight_id = $1;';
            values = [!isNaN(req.query.id) ? Number(req.query.id) : 1185];
        }
    }

    db.query(querySearch, values, (err, query) => res.json({ data: query.rows, totalResults: totalFlights }))
});


router.put('/:id', (req, res) => {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(req);
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    console.log(req.body);

    let querySearch = `UPDATE flights 
                        SET flight_no = $1,
                        departure_airport = $2,
                        arrival_airport = $3,
                        status = $4,
                        aircraft_code = $5,
                        scheduled_departure = $6,
                        scheduled_arrival = $7
                        WHERE flight_id = $8;`;
    let values = [req.body.flight_no, req.body.departure_airport, req.body.arrival_airport, req.body.status, req.body.aircraft_code, req.body.scheduled_departure, req.body.scheduled_arrival, req.params.id];

    db.query(querySearch, values, (err, query) => res.json({ data: "jeje" }))
})



module.exports = router;