//Consumer for Kafka.

const { Kafka } = require("kafkajs"); //Kafka Node.js library.
require('../db/mongoose') //Running the database.
const Log = require('../db/models/log'); //Importing log model.

const createConsumer = async () => { //Asynchronous function to create a consumer.
    try {
        //Connect to kafka.
        const kafka = new Kafka({
            clientId: "kafka_2",
            brokers: ["localhost:9092"]
        });
        //Consumer group
        const consumer = kafka.consumer({
            groupId: "consumer_group_new"
        });
        //Connect the consumer.
        await consumer.connect();
        //Subscribing to topic.
        await consumer.subscribe({
            topic: "logs",
            fromBeginning: true
        });
        //Function to be run everytime a log sent to Kafka.
        await consumer.run({
            eachMessage: async ( { partition, message } ) => {
                //Parsing data back to JSON and destructring into components.
                const { method, responseTime, timestamp } = JSON.parse(message.value);
                //Creating a new log with Log model.
                const data = {
                    method,
                    responseTime,
                    timestamp
                }
                const log = new Log(data);
                //Saving to the database.
                console.log(log)
                log.save(log).then(() => { 
                    console.log('Saved', data);
                }).catch((e)=>{
                    console.log('Error', e)
                })
            },
        });
    } catch (error) {
        console.log('error', error);
    }
}

createConsumer();