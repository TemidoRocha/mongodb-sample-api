import { MongoClient, ObjectId } from 'mongodb';

let companies: any;
const DEFAULT_SORT = [['tomatoes.viewer.numReviews', -1]];

export default class AirDAO {
  static async injectDB(conn: MongoClient) {
    if (companies) {
      return;
    }
    try {
      companies = await conn.db(process.env.MONGODB_TRAINING).collection('companies');
    } catch (e) {
      console.error(`Unable to establish a collection handle in moviesDAO: ${e}`);
    }
  }

  /**
   * Finds and returns companies by name.
   * Returns a list of objects, each object contains a title and an _id.
   * @returns {getAirCompanies} An object with movie results and total results
   * that would match this query
   */
  static async getAirCompanies<GetAirCompanies>() {
    try {
      const pipeline = [
        // {
        //   $group: {
        //     _id: '$email',
        //     count: {
        //       $sum: 1,
        //     },
        //   },
        // },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 5,
        },
      ];

      // Use a more durable Read Concern here to make sure this data is not stale.
      const readConcern = { level: 'majority' };
      const _companies: Company[] = (
        await companies.aggregate(pipeline, {
          readConcern,
        })
      ).toArray();
      const totalNumMovies = await companies.countDocuments();

      return { companies: await _companies, totalNumMovies };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { companiesList: [], totalNumMovies: 0 };
    }
  }
}

interface Company {
  _id: ObjectId;
  name: string;
  permalink: string;
  crunchbase_url: string;
  homepage_url: string;
  blog_url: string;
  blog_feed_url: string;
  twitter_username: string;
  category_code: string;
  number_of_employees: number;
  founded_year: number;
  founded_month: number;
  founded_day: number;
  deadpooled_year: number;
  deadpooled_month: number;
  deadpooled_day: number;
  deadpooled_url: string;
  tag_list: string;
  alias_list: string;
  email_address: string;
  phone_number: string;
  description: string;
  created_at: string;
  updated_at: string;
  overview: string;
}

interface GetAirCompanies {
  companiesList: Company[];
  totalNumResults: number;
}

/**
 * This is a parsed query, sort, and project bundle.
 * @typedef QueryParams
 * @property {Object} query - The specified query, transformed accordingly
 * @property {any[]} sort - The specified sort
 * @property {Object} project - The specified project, if any
 */

/**
 * Represents a single country result
 * @typedef CountryResult
 * @property {string} ObjectID - The ObjectID of the movie
 * @property {string} title - The title of the movie
 */

/**
 * IMDB subdocument
 * @typedef IMDB
 * @property {number} rating
 * @property {number} votes
 * @property {number} id
 */

/**
 * Faceted Search Return
 *
 * The type of return from faceted search. It will be a single document with
 * 3 fields: rating, runtime, and movies.
 * @typedef FacetedSearchReturn
 * @property {object} rating
 * @property {object} runtime
 * @property {MFlixMovie[]}movies
 */
