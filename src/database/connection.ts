import mongoose from 'mongoose';
import { MongoParseError } from 'mongodb';

let URI: string = process.env.MONGO_DB_URI || '';

async function connectDB(): Promise<void | Error> {
  try {
    await mongoose.connect(URI);
    console.log(`database connected to ${URI}`);
  } catch (error: MongoParseError | any) {
    if (error instanceof MongoParseError) {
      console.log('hello');
      return new Error(error.message);
    }
    return error;
  }
}

export default connectDB;
