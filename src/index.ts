/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// express doesn't handle async erros by itself
import 'express-async-errors';

dotenv.config();

import connectDB from './database/connection';
import errorHandler from './errors/handler';
import { createConnection } from 'mongoose';

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(errorHandler);

/**
 * Server Activation
 */
async function initiate(): Promise<void> {
  try {
    let connection: void | Error = await connectDB();
    if (connection instanceof Error) {
      throw new Error(connection.message);
    }
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}`);
    });
  } catch (error) {
    console.log(`initiate error: ${error}`);
  }
}

initiate();
