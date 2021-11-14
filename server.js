var express = require("express");
var path = require("path");
var fs = require("fs");
var data = fs.readFileSync('db/db.json', 'utf8');
var notes = JSON.parse(data); 
var app = express();
var PORT = process.env.PORT || 3000;

//Randomly generated ID for each note
var uniqueId = function() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./public/'));

