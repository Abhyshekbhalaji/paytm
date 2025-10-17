import mongoose from 'mongoose';
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb';
dotenv.config();



const dbUrl = process.env.DB_URL;
if (!dbUrl) {
    throw new Error('DB_URL is not defined in environment variables');
}
export const client = new MongoClient(dbUrl);

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Connected to the DB');
    })
    .catch((err) => {
        console.error('Failed to connect to the DB', err);
    });
