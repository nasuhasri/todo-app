

const mongoose = require("mongoose");
const url = "mongodb+srv://nasuhasri:<nasuhasri123>@cluster0.0qyq4.mongodb.net/<dbTodo>?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then( () => {
        console.log("Connected To DB!")
    })
    .catch( (err) => {
        console.log("Error Connecting To DB!" + err)
    })