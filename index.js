const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

const favicon = require('serve-favicon')
const path = require('path')

//models
const todotask = require("./models/todotask");

dotenv.config();

app.use(favicon(path.join(__dirname, 'public/images', 'bg.ico')))
app.use("/static", express.static("public"));
//view engine configuration
app.set("view engine", "ejs");
// Urlencoded will allow us to extract the data from the form by adding her to the body property of the request.
app.use(express.urlencoded({ extended: true }));

// Connect to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser:true, useUnifiedTopology: true }, () => {
    //console.log("Connected to db!");
    console.log(mongoose.connection.readyState)
    app.listen(3000, () => console.log("Server is running and  listening to port:3000!"));
})

// Post Method - insert data
app.post("/", async (req, res) => {
    const todoTask1 = new todotask({
        content: req.body.content
    });
    //console.log(req.body);

    try {
        await todoTask1.save();
        console.log("Successfully saved!")

        res.redirect("/");
    } catch (error) {
        console.log("error at post method!" + error);

        res.redirect("/");
    }
});

/** Get method - read data
    TodoTask get from model **/
app.get("/", (req, res) => {
    todotask.find( {}, (err, tasks) => {
        res.render("todo", { TodoTask: tasks });
    });
});

app.get("/hello", (req, res) => {
    res.render("hello");
});

/** Update **/
app.route("/edit/:id").get( (req, res) => {
    const id = req.params.id;
    TodoTask.find( {}, (err, tasks) => {
        res.render("todoUpdate.ejs", { TodoTask: tasks, idTask: id});
    });
})
.post( (req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err){
            return res.send(500, err);
        } else {
            res.redirect("/");
        }
    });
});

/** Delete **/
app.get("/remove/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if(err){
            return res.send(500, err);
        } else {
            res.redirect("/");
        }
    });
});

