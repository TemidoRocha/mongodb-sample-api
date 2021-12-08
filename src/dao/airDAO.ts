import { MongoClient, Document } from 'mongodb';
import {
  GetCarriersByRouteandAlliance,
  GetDstCarriersAirlinesBySrcAirport,
  DstCarriersAirlinesBySrcAirport,
  GetSrcCarriersAirlinesByDstAirport,
  SrcCarriersAirlinesByDstAirport,
} from '../interfaces/air.interfaces';
import { Pagination } from '../interfaces/general.interfaces';

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
   * @returns {GetCarriersByRouteandAlliance} An object with carriers
   */
  static async getCarriersByRouteandAlliance(
    source: string,
    destination: string
  ): Promise<GetCarriersByRouteandAlliance[]> {
    try {
      console.log(source, destination);
      const pipeline = [
        {
          $match: {
            src_airport: source,
            dst_airport: destination,
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

  /**
   * get the source airports with an array of destinations with airline and carrier.
   * the amount of destinations
   * total number of source airports
   * @returns {GetDstCarriersAirlinesBySrcAirport} An object with movie results and total results
   * that would match this query
   */
  static async getDstCarriersAirlinesBySrcAirport(
    searchConfig: Pagination
  ): Promise<GetDstCarriersAirlinesBySrcAirport> {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$src_airport',
            destinations: {
              $push: {
                dst_airport: '$dst_airport',
                airline: '$airline',
                airplane: '$airplane',
              },
            },
          },
        },
        {
          $set: {
            dstCount: {
              $size: '$destinations',
            },
          },
        },
        // TODO: total number of destinatin airports
        {
          $skip: searchConfig.page * searchConfig.VALUES_PER_PAGE,
        },
        {
          $limit: searchConfig.VALUES_PER_PAGE,
        },
      ];

      // Use a more durable Read Concern here to make sure this data is not stale.
      const readConcern = { level: 'majority' };
      const cursor = await airRoutes.aggregate(pipeline, {
        readConcern,
      });

      const _srcAirport: DstCarriersAirlinesBySrcAirport[] = await cursor.toArray();

      return {
        srcAirports: _srcAirport,
        page: searchConfig.page,
        entries_per_page: searchConfig.VALUES_PER_PAGE,
      };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return {
        srcAirports: [],
        page: 0,
        entries_per_page: 0,
      };
    }
  }

  /**
   * get the destination airports with an array of source airports with airline, carrier
   * and the amount of destinations
   * total number of destinatin airports
   * @returns {GetSrcCarriersAirlinesByDstAirport} An object with movie results and total results
   * that would match this query
   */
  static async getSrcCarriersAirlinesByDstAirport(
    searchConfig: Pagination
  ): Promise<GetSrcCarriersAirlinesByDstAirport> {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$dst_airport',
            destinations: {
              $push: {
                dst_airport: '$src_airport',
                airline: '$airline',
                airplane: '$airplane',
              },
            },
          },
        },
        {
          $set: {
            dstCount: {
              $size: '$destinations',
            },
          },
        },
        // TODO: total number of destinatin airports
        {
          $skip: searchConfig.page * searchConfig.VALUES_PER_PAGE,
        },
        {
          $limit: searchConfig.VALUES_PER_PAGE,
        },
      ];

      // Use a more durable Read Concern here to make sure this data is not stale.
      const readConcern = { level: 'majority' };
      const cursor = await airRoutes.aggregate(pipeline, {
        readConcern,
      });

      const _dstAirport: SrcCarriersAirlinesByDstAirport[] = await cursor.toArray();

      return {
        dstAirports: _dstAirport,
        page: searchConfig.page,
        entries_per_page: searchConfig.VALUES_PER_PAGE,
      };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return {
        dstAirports: [],
        page: 0,
        entries_per_page: 0,
      };
    }
  }
}
