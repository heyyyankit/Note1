// import express from "express";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const path = require("path");
const app = express();

mongoose.connect("mongodb://localhost:27017/noteAppDB").then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing JSON bodies
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, function(){
    console.log("[heyyyankit] port started at 3000")
});
app.get("/", function(req, res){
    res.render("home");
});

app.use("/user", userRoute); // localhost:3000/user/.....

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
// app.get("/signup", function(req, res){
//     res.render("signup");
// });
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