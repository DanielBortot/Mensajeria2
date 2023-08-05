import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: join(__dirname, '/../.././.env')})

const database = () => {
    mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD}@cluster0.qthwx5f.mongodb.net/mensajeria`, {useNewUrlParser: true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
}

export default database;