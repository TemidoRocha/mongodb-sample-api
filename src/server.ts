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

import airRoutes from './api/airRoutes.route';
import companies from './api/companies.route';
import errorHandler from './errors/handler';

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(errorHandler);

// Register api routes
app.use('/api/v1/airroutes', airRoutes);
app.use('/api/v1/companies', companies);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
