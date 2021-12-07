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
  static async getAirCompanies(): Promise<GetAirCompanies> {
    try {
      const pipeline = [
        {
          $project: {
            _id: 0,
            name: 1,
            permalink: 1,
            crunchbase_url: 1,
            homepage_url: 1,
            blog_url: 1,
            blog_feed_url: 1,
            twitter_username: 1,
            category_code: 1,
            number_of_employees: 1,
            founded_year: 1,
            founded_month: 1,
            founded_day: 1,
            deadpooled_year: 1,
            deadpooled_month: 1,
            deadpooled_day: 1,
            deadpooled_url: 1,
            tag_list: 1,
            alias_list: 1,
            email_address: 1,
            phone_number: 1,
            description: 1,
            created_at: 1,
            updated_at: 1,
            overview: 1,
          },
        },
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
      const totalNumResults: number = await companies.countDocuments();

      return { companiesList: _companies, totalNumResults };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return { companiesList: [], totalNumResults: 0 };
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
