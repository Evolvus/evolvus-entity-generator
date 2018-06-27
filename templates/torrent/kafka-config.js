const KAFKA_BROKERS = process.env.KAFKA_BROKERS || 'localhost:9092';
const TOPIC_NAME = process.env.AUDIT_EVENT_TOPIC || 'topic.audit.events';


var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({ kafkaHost: KAFKA_BROKERS }),
    KeyedMessage = kafka.KeyedMessage,
    producer = new Producer(client);

var isProducerReady = false;

producer.on('ready', function() {
    isProducerReady = true;
    console.log(`[Kafka Connected ] : ${KAFKA_BROKERS}`);
});

producer.on('error', function(err) {
    console.log(`There is something wrong with Kafka producer :${err}`);
});

module.exports.produce = (docket) => {
        if (isProducerReady === true) {
            var payloads = [
                { topic: TOPIC_NAME, messages: JSON.stringify(docket) }
            ];
            producer.send(payloads, function(err, data) {
                if (err) {
                    console.log(`Failed to send :${err}`);
                }
                console.log(`Sent Data ${data}`);
            });
        }