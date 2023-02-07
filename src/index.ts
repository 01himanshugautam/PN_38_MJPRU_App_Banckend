import * as env from 'dotenv';
env.config();

import 'es6-shim';
import 'reflect-metadata';
import express from 'express';
import { buildApp } from './app';
import '@mapper/mapping.profile';

const app = express();
buildApp(app);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
