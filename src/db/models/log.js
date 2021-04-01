const mongoose = require('mongoose'); //For using MongoDB features.

//A data model to write database.
const Log = mongoose.model('Log', {
    method: {
        type: String
    },
    responseTime: {
        type: Number
    },
    timestamp: {
        type: Number
    }
})

module.exports = Log;