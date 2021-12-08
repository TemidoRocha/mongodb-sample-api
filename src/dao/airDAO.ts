import { MongoClient, Document } from 'mongodb';
import { GetCarriersByRouteandAlliance } from '../interfaces/air.interfaces';

let airRoutes: Document;

export default class AirDAO {
  static async injectDB(conn: MongoClient) {
    if (airRoutes) {
      return;
    }
    try {
      airRoutes = await conn.db(process.env.MONGODB_AGGREGATIONS).collection('air_routes');
    } catch (e) {
      console.error(`Unable to establish a collection handle in AirDAO: ${e}`);
    }
  }

  /**
   * Find the type of carrriers by air alliance taking into consideration the SRC and DST
   * Returns a list of objects, each object contains a title and an _id.
   * @param {string, string} - source, destination
   * @returns {GetCarriersByRouteandAlliance} An object with movie results and total results
   * that would match this query
   */
  static async getCarriersByRouteandAlliance(
    source: string,
    destination: string
  ): Promise<GetCarriersByRouteandAlliance[]> {
    try {
      const pipeline = [
        {
          $match: {
            src_airport: 'JFK',
            dst_airport: 'LHR',
          },
        },
        {
          $lookup: {
            from: 'air_alliances',
            foreignField: 'airlines',
            localField: 'airline.name',
            as: 'alliance',
          },
        },
        {
          $unwind: '$alliance',
        },
        {
          $group: {
            _id: '$alliance.name',
            carriers: { $push: '$$ROOT.airplane' },
          },
        },
        {
          $addFields: {
            totalCarriers: { $size: '$carriers' },
          },
        },
      ];

      // Use a more durable Read Concern here to make sure this data is not stale.
      const readConcern = { level: 'majority' };
      const cursor = await airRoutes.aggregate(pipeline, {
        readConcern,
      });

      const _airRoutes: GetCarriersByRouteandAlliance[] = await cursor.toArray();

      return _airRoutes;
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return [];
    }
  }
}
