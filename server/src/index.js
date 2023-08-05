import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/rutas.js';
import database from './database.js';
import bodyParser from 'body-parser';
import { app, server } from './server.js';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: join(__dirname, '/../.././.env')})
database();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', router);
app.use(express.static(join(__dirname, '../../client/build')));

server.listen(process.env.PORT || 3900, () => {
    console.log('server abierto');
})