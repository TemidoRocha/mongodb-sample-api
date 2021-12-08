/**
 * Required External Modules
 */
import app from './server';
import { MongoClient } from 'mongodb';
import CompaniesDAO from '../src/dao/companiesDAO';
import AirDAO from '../src/dao/airDAO';

/**
 * Variables
 */
const PORT: number = parseInt(process.env.PORT as string, 10);

let URI: string = process.env.MONGO_DB_URI || '';

/**
 * Server Activation
 */
async function initiate(): Promise<void> {
  try {
    const client = new MongoClient(URI);
    console.log(`MongoDb status: connected`);

    await client.connect();
    await CompaniesDAO.injectDB(client);
    await AirDAO.injectDB(client);

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
