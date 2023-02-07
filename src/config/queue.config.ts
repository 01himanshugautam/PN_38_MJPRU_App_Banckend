import amqplib, { Channel, Connection } from 'amqplib';

let connection: Connection;

export default async function queueConfig() {
  connection = await amqplib.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
  });
  console.log('Queue is running....');
}

export async function channel() {
  const channel: Channel = await connection.createChannel();
  return channel;
}
