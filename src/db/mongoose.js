const mongoose = require('mongoose'); //For using MongoDB features.

//Connecting to the database.
mongoose.connect("mongodb://127.0.0.1:27017/logs", {
    useNewUrlParser: true,
    useCreateIndex: true
}, ()=>{
    console.log('Connected to database.'); //Callback function to run when database connection is successful.
})

