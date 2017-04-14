// app.js for homework #7 - blackjack

const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');

const [PORT, HOST] = [3000, '127.0.0.1'];
const app = express();

//app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, HOST);
