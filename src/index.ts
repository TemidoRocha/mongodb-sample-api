/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { MongoClient } from 'mongodb';

// express doesn't handle async erros by itself
import 'express-async-errors';

dotenv.config();

import errorHandler from './errors/handler';

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

let URI: string = process.env.MONGO_DB_URI || '';

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
    const client: MongoClient = new MongoClient(URI);
    console.log(`MongoDb connected to:\n ${URI}`);

    await client.connect();
    // await MoviesDAO.injectDB(client);
    // await UsersDAO.injectDB(client);
    // await CommentsDAO.injectDB(client);
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}`);
    });
  } catch (error: any) {
    console.log('### initiate error:');
    console.error(error.stack);
    process.exit(1);
  }
}

initiate();
