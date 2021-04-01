//Producer for Kafka.
const { Kafka } = require("kafkajs"); //Kafka Node.js library.

const producer = async (value) => { //Asynchronous function to create a producer.
    try {
        //Connect to kafka.
        const kafka = new Kafka({
            clientId: "kafka_2",
            brokers: ["localhost:9092"]
        });
        //Create producer
        const producer = kafka.producer();
        //Connect the producer.
        await producer.connect();
        
        //Send message
        const message_result = await producer.send({
            topic: "logs",
            messages: [
                {
                    value: JSON.stringify(value),
                    partition: 0     
                }
            ]
        })
        await producer.disconnect();
        
    } catch (error) {
        console.log("error", error)
    }
} 

module.exports = producer;