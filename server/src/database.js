import mongoose from 'mongoose';

const database = () => {
    mongoose.connect('mongodb+srv://Darkchanga:300902@cluster0.qthwx5f.mongodb.net/mensajeria', {useNewUrlParser: true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
}

export default database;