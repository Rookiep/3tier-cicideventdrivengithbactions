
const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

let channel;

async function connect(){
  const conn = await amqp.connect("amqp://rabbitmq");
  channel = await conn.createChannel();
  await channel.assertQueue("tasks");
}
connect();

app.post("/tasks", async (req,res)=>{
  channel.sendToQueue("tasks", Buffer.from(req.body.task));
  res.send("Task queued");
});

app.listen(3000, ()=>console.log("API running"));
