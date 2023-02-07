import { IBaseJob } from '../interface/job.interface';
import { Channel } from 'amqplib';
import { channel } from '@config/queue.config';

export class BaseJob implements IBaseJob {
  queueName: string;
  channel: Channel;
  _this: any;
  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async handle() {
    console.log('Process Done.');
  }

  async initQueue() {
    this.channel = await channel();
    await this.channel.assertQueue(this.queueName, {
      durable: true,
    });
  }

  async process() {
    await this.handle();
  }

  async enqueue(data: any, config: any = { attempt: 5 }): Promise<void> {
    await this.initQueue();
    this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data), 'utf-8'));
    if (config.api_version == 'v1') {
      await this.process();
    }
  }
}
