const express = require('express');
const router = express.Router();
const db = require("../db")

//las rutas empiezan desde /api/boarding_passes
 router.get('/', (req, res) => {
   db.query("SELECT * FROM boarding_passes LIMIT 30 ", (err, query) => {
       res.json(query.rows);
    })
});
router.delete('/:idTicket/:idFlight', (req, res) => {
    db.query("DELETE FROM boarding_passes WHERE ticket_no = $1 AND flight_id =$2  ",[req.params.idTicket, req.params.idFlight] ,(err, query) => {
        res.send("deleted");
     }) 
 });

 router.put('/:idTicket/:idFlight', (req, res) => {
    db.query("UPDATE set boarding_no = $3  set seat_no = $4 and  WHERE ticket_no = $1 AND flight_id =$2  ",[req.params.idTicket, req.params.idFlight, req.body.boarding, req.body.seat] ,(err, query) => {
       
        res.send('boarding: ' + req.body.boarding);
     }) 
 });
 router.get('/:idTicket/:idFlight', (req, res) => {
    db.query("SELECT * FROM boarding_passes  WHERE ticket_no = $1 AND flight_id =$2  ",[req.params.idTicket, req.params.idFlight] ,(err, query) => {
        res.json(query.rows);
     }) 
 });
 router.get('/', (req, res) => {
    db.query("UPDATE boarding_passes SET boarding_no= seat_no=  ",[req.params.id] ,(err, query) => {
        res.json(query.rows);
     }) 
 });
module.exports = router;

