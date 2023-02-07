import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';
import * as env from 'dotenv';
env.config();

export const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  }),
});
