const express = require('express');
const router = express.Router();
const db = require("../db")
const bodyParser= require('body-parser');
const jsonParser= bodyParser.json();

//las rutas empiezan desde /api/boarding_passes
 router.get('/', (req, res) => {
   db.query("SELECT * FROM boarding_passes  ORDER BY ticket_no limit 100", (err, query) => {
       res.json(query.rows);
    })
});

router.get('/:idTicket/:idFlight', (req, res) => {
    db.query("SELECT * FROM boarding_passes  WHERE ticket_no = $1 AND flight_id =$2  ",[req.params.idTicket, req.params.idFlight] ,(err, query) => {
        res.json(query.rows);
     }) 
 });

router.delete('/:idTicket/:idFlight', (req, res) => {
    db.query("DELETE FROM boarding_passes WHERE ticket_no = $1 AND flight_id =$2  ",[req.params.idTicket, req.params.idFlight] ,(err, query) => {
        if(err){
            console.log(err)
           }
            res.send("deleted");
     }) 
 });

 router.put('/:idTicket/:idFlight', jsonParser, (req, res) => {
    db.query("UPDATE boarding_passes set boarding_no = $3, seat_no = $4 WHERE ticket_no = $1 AND flight_id = $2  ",[req.params.idTicket, req.params.idFlight, req.body.boarding_no, req.body.seat_no] ,(err, query) => {
       if(err){
        console.log(err)
       }
       console.log(req.body)
     }) 
 });

 router.post('/',jsonParser, (req, res) => {
    console.log(req.body)
    db.query("INSERT INTO ticket_flights (ticket_no, flight_id,fare_conditions,amount) VALUES ($1,$2,'Bussines',42100.00) ",[req.body.ticket_no, req.body.flight_id] ,(err, query) => {
        if(err){
            console.log(err)
           }
           console.log(req.body)
           
     })
    db.query("INSERT INTO  boarding_passes (ticket_no, flight_id, boarding_no, seat_no) VALUES ($1,$2,$3,$4) ",[req.body.ticket_no, req.body.flight_id, req.body.boarding_no, req.body.seat_no] ,(err, query) => {
        if(err){
            console.log(err)
           }
           console.log(req.body)
            res.send("created");
     })
 });
module.exports = router;

