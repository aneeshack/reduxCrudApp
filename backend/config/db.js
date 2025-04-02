// db.js or server.js example
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('❌ MongoDB Connection Error::', error);
        process.exit(1);
    }
};

export default connectDb;
