'use strict'
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3006;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let tables = [

];
let waitList = [

];
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitList));
app.post('/api/tables', (req, res) => {
    const newReservation = req.body;

    if (tables.length > 4) {
        waitList.push(newReservation);
    } else {
        tables.push(newReservation);
    }
    console.log(newReservation);

    res.json(newReservation);
});
app.post('/api/clear', (req, res) => {
    tables = [];
    waitList = [];
    res.json(tables);
});
app.listen(PORT, () => console.log('App listening on PORT ' + PORT));