// db.js or server.js example
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database is connected successfully');
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }
};

export default connectDb;
