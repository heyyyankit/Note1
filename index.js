// import express from "express";
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, function(){
    console.log("[heyyyankit] port started at 3000")
});
app.get("/", function(req, res){
    res.render("home");
});
app.get("/createNote", function(req, res){
    res.render("addNote");
})
app.get("/notesList", function(req, res){
    res.render("allNotes", {arr: arr}); // => views/allNotes.ejs
})
// for viewNote (single) page, route by id
app.get("/notes/:id", function(req, res){
	const id = Number(req.params.id);
	if (!Number.isInteger(id) || id < 0 || id >= arr.length) {
		return res.status(404).send("Note not found");
	}
	const note = arr[id];
	res.render("viewNote", { note: note, id: id });
})
var arr = [];   // title and body obj
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