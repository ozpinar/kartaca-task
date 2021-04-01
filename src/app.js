const express = require('express'); //To create web server.
const app = express()
const responseTime = require("response-time"); //To measure response time.
const fs = require('fs'); //To access file system.
const logToKafka = require('./kafka/producer.js') //Kafka producer.
const cors = require('cors'); //For CORS configuration.
const path = require('path'); //Node module for path.

//Keeps logs to send clientside.
let logsForClient = {
    logs: []
}

//Middleware function to write logs (method, response time, timestamp) to a log file and Kafka.
const logToFileAndKafka = responseTime((req, res, time) => { //It uses express package called responseTime
    //Creating empty log object with an empty array of logs to later fill with data.
    let log = {
        logs: []
    }    
    //Saving latest log into an object.
    let latest_log = {
        method: req.method,
        responseTime: time,
        timestamp: Date.now()
    }

    logsForClient.logs.push(latest_log);
    
    //If file exists do not overwrite, read file, parse to object, push new data, write again.
    if (fs.existsSync(__dirname + '/logs.json')){
        fs.readFile(__dirname + '/logs.json','utf-8', (err, data) => {
            if (err) return console.log(err);
            log = JSON.parse(data)
            log.logs.push(latest_log)
            fs.writeFile(__dirname + '/logs.json', JSON.stringify(log, null, 2), 'utf8', (err) => {
                if (err) console.log(err);
            })
        });
    }
    //If it is first log write directly.
    else {
        log.logs.push(latest_log)
        fs.writeFile(__dirname +'/logs.json', JSON.stringify(log, null, 2), 'utf8', (err) => {
           if(err) console.log(err);
        })
    }
    //Send log to kafka producer.
    logToKafka(latest_log);
  })


//Apply middlewares to endpoints.
app.use(cors());
app.use('/get', logToFileAndKafka);
app.use('/post', logToFileAndKafka);
app.use('/put', logToFileAndKafka);
app.use('/delete', logToFileAndKafka);
//Show index.html on localhost
app.use(express.static(path.join(__dirname, "../views")));

//Get request endpoint.
app.get('/get', (req,res) => {
    res.send("Get endpoint runs.");
})
//Post request endpoint.
app.post('/post', (req, res) => {
    res.send("Post endpoint runs.")
})
//Put request endpoint.
app.put('/put', (req,res)=>{
    res.send("Put endpoint runs.")
})
//Delete request endpoint.
app.delete('/delete', (req, res)=>{
    res.send("Delete endpoint runs.")
})

//Endpoint to send the data to clientside.
app.get('/logs', (req, res) => {
    res.send(logsForClient);
});

//Running the server on port 3000.
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running.")
})