import { Pagination } from '../interfaces/general.interfaces';
import { Request, Response } from 'express';

export default class SearchServices {
  static searchPagination(req: Request, res: Response): Pagination {
    const VALUES_PER_PAGE = 20;
    let page: number;
    try {
      page = req.query.page ? parseInt(req.query.page as string, 10) : 0;
    } catch (e) {
      console.error(`Got bad value for page:, ${e}`);
      page = 0;
    }

    return {
      page,
      VALUES_PER_PAGE,
    };
  }
}
