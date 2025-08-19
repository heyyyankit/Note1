// import express from "express";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.listen(3000, function(){
    console.log("port started at 3000")
});
app.get("/", function(req, res){
    res.send(`
        <h1>Welcome to the home page</h1>
        <div style="margin: 10px;">
        <a href = "/createNote">
        <button type="button" style="width: 100px; height: 50px;"> Create Note </button>
        </a>
        </div>
        <div style="margin: 10px;">
        <a href = "/notesList">
        <button type="button" style="width: 100px; height: 50px;"> Notes List </button>
        </a>
        </div>
        `)
})
app.get("/createNote", function(req, res){
    res.render("addNote");
})
app.get("/notesList", function(req, res){
    res.render("allNotes", {arr: arr}); // => views/allNotes.ejs
})
app.get("/notes/:id", function(req, res){
	const id = Number(req.params.id);
	if (!Number.isInteger(id) || id < 0 || id >= arr.length) {
		return res.status(404).send("Note not found");
	}
	const note = arr[id];
	res.render("viewNote", { note: note, id: id });
})
var arr = [];   // title and body
var x;
var y;
app.post("/createNote", function(req,res){
    x = String(req.body.x);
    y = String(req.body.y);
    const note = {
        title: x,
        body: y
    }
    arr.push(note);
    res.redirect("/createNote") // => .get
})