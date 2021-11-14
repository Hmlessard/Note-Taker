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

//Homepage
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API path for notes page, returns entries in the json file
app.get("/api/notes", function(req, res) {
    console.log(notes);
    return res.json(notes);
});

//Default route
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

 //Create new notes and save to db.json
 app.post("./api/notes", function(req, res) {
     var newNote = req.body;
     newNote.id = uniqueId();
     notes.push(newNote);
     fs.writeFileSync("./db/db.json", JSON.stringify(notes));
     res.json(notes);
 });

 //Server Start
 app.listen(PORT,function(){
     console.log("application listening" + PORT);
 });
 //Delete notes
 