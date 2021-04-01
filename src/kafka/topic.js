//Creating topic for Kafka
const { Kafka } = require("kafkajs"); //Kafka Node.js library.

const createTopic = async () => { //Asynchronous function to create a topic.
    try {
        //Connect to kafka.
        const kafka = new Kafka({
            clientId: "kafka_2",
            brokers: ["localhost:9092"]
        });
        //Create admin
        const admin = kafka.admin();
        //Connect admin
        await admin.connect();
        //Create topic
        await admin.createTopics({
            topics: [
                {
                    topic: "logs",
                    numPartitions: 1
                }
            ]
        })
        //Disconnect admin.
        await admin.disconnect();
    } catch (error) {
        console.log('Hata', error)
    } finally {
        process.exit();
    }
}

createTopic();
