import { MongoClient } from 'mongodb';
import { Company, GetCompanies } from '../interfaces/companies.interfaces';
import { Pagination } from '../interfaces/general.interfaces';

let companies: any;

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
   * @returns {getCompanies} An object with movie results and total results
   * that would match this query
   */
  static async getCompanies(searchConfig: Pagination): Promise<GetCompanies> {
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
            count: 1,
          },
        },
        {
          $skip: searchConfig.page * searchConfig.VALUES_PER_PAGE,
        },
        {
          $limit: searchConfig.VALUES_PER_PAGE,
        },
      ];

      // Use a more durable Read Concern here to make sure this data is not stale.
      const readConcern = { level: 'majority' };
      const cursor = await companies.aggregate(pipeline, {
        readConcern,
      });

      const _companies: Company[] = await cursor.toArray();
      const totalNumResults: number = await companies.countDocuments();

      return {
        companiesList: _companies,
        totalNumResults,
        page: searchConfig.page,
        entries_per_page: searchConfig.VALUES_PER_PAGE,
      };
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      return {
        companiesList: [],
        totalNumResults: 0,
        page: 0,
        entries_per_page: 0,
      };
    }
  }
}
