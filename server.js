const express = require('express')
const mongoose = require('mongoose')
var app = express()
var Data = require('./noteSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
     console.log("connected to database!")
}).on("error", (error) => {
    console.log("failed to connect " + error)
})

// create a note
// post
app.post("/create", (req, res) => {
    var note = new Data({
        title: req.query.title,
        date: req.query.date,
        content: req.query.content
    })

    note.save().then(() => {
        if(note.isNew == false){
            console.log("saved data!")
            res.send("saved data!")
        } else {
            console.log("failed to save data!")
        }
    })
})

// delete a note
// post
app.post("/delete", (req, res) => {
    Data.findOneAndRemove({
        _id: req.query.id
    }, (err) => {
        console.log("failed" + err)
    })

    res.send("deleted")
})


// update a note
// post
app.post("/update", (req, res) => {
    Data.findOneAndUpdate({
        _id: req.query.id
    }, {
        note: req.query.content,
        title: req.query.title,
        date: req.query.date
    }, (err) => {
        console.log("failed to update" + err)
    })

    res.send("updated!")
})

// fetch all notes
// get
app.get("/fetch", (req, res) => {
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
}) 

var server = app.listen(8081, "10.0.0.209", () => {
    console.log("server is running!")
})