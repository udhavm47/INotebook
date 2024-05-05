import 'dotenv/config';
import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

export const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI)
            .then(console.log("connected!"))
    } catch (error) {
        console.log("not Connected")
    }




}
