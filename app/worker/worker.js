
const amqp = require("amqplib");

async function start(){
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();
  await channel.assertQueue("tasks");

  channel.consume("tasks", msg => {
    console.log("Processing:", msg.content.toString());
    channel.ack(msg);
  });
}

start();
