const express = require('express');
const router = express.Router();
const db = require("../db")
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//las rutas empiezan desde /api/flights
let offset = 0;
let limit = 10;


const validateId = (id, totalRows) => id >= 1 && id <= totalRows;

const getTotalAircrafts = async () => {
    let querySearch = "SELECT COUNT(DISTINCT aircraft_code) FROM aircrafts_data Limit 200;"
    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].count));
        });
    });
}

const getTotalStatus = async () => {
    let querySearch = "SELECT Count(DISTINCT status) FROM flights LIMIT 35000;"
    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].count));
        });
    });
}

const getTotalAirports = async () => {
    let querySearch = "SELECT COUNT(*) FROM airports limit 200;"
    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].count));
        });
    });
}

const getTotalFlights = async () => {
    let querySearch = "SELECT COUNT(*) FROM flights;";

    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].count));
        });
    });
};

const getNewID = async () => {
    let querySearch = "SELECT MAX(flight_id) FROM flights;"
    return new Promise((resolve, reject) => {
        db.query(querySearch, (err, query) => {
            resolve(Number(query.rows[0].max) + 1);
        });
    });
}
router.post('/', jsonParser, async (req, res) => {
    let newId = await getNewID();
    let querySearch = " INSERT INTO flights (flight_id,flight_no,scheduled_departure,scheduled_arrival,departure_airport,arrival_airport,status,aircraft_code,actual_departure,actual_arrival) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10);";
    let values = [
        newId,
        req.body.flight_number,
        req.body.scheduled_departure,
        req.body.scheduled_arrival,
        req.body.departure_airport,
        req.body.arrival_airport,
        req.body.status,
        req.body.aircraft_code,
        req.body.actual_departure,
        req.body.actual_arrival];

    console.log(values);
    db.query(querySearch, values, (err, query) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ data: query.rows });
        }
    });
});

router.get('/aircrafts', async (req, res) => {
    let querySearch = "SELECT DISTINCT aircraft_code FROM aircrafts_data Limit 200;";
    let totalRegister = await getTotalAircrafts();
    db.query(querySearch, (err, query) => res.json({ data: query.rows, totalResults: totalRegister }));

});

router.get('/status', async (req, res) => {
    let querySearch = "SELECT DISTINCT status FROM flights Limit 35000;";
    let totalRegister = await getTotalStatus();
    db.query(querySearch, (err, query) => res.json({ data: query.rows, totalResults: totalRegister }));
});


router.get('/airports', async (req, res) => {
    let querySearch = "SELECT DISTINCT departure_airport FROM flights Limit 200;";
    let totalRegister = await getTotalAirports();
    db.query(querySearch, (err, query) => res.json({ data: query.rows, totalResults: totalRegister }));
});

router.get('/', async (req, res) => {
    let totalFlights = await getTotalFlights();
    let querySearch = "SELECT * FROM flights ORDER BY flight_id LIMIT $1 OFFSET $2;";
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



router.put('/:id', jsonParser, (req, res) => {
    let querySearch = `UPDATE flights 
                        SET flight_no = $1,
                        departure_airport = $2,
                        arrival_airport = $3,
                        status = $4,
                        aircraft_code = $5
                        WHERE flight_id = $6;`;
    let values = [req.body.flight_no, req.body.departure_airport, req.body.arrival_airport,
    req.body.status, req.body.aircraft_code, Number(req.params.id)];

    db.query(querySearch, values, (err, query) => {
        if (err) {
            res.json({ data: false });
        } else {
            res.json({ data: true });
        }
    });
})

router.delete('/:id', (req, res) => {
    let querySearch = `DELETE FROM flights WHERE flight_id = $1;`;
    let values = [Number(req.params.id)];
    db.query(querySearch, values, (err, query) => {
        if (err) {
            res.json({ data: false });
        } else {
            res.json({ data: true });
        }
    });
})



module.exports = router;