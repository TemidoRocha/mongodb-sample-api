import { AirSearchCompany } from '../interfaces/air.interfaces';
import { Request, Response } from 'express';

export default class AirServices {
  static airSearchCompany(req: Request, res: Response): AirSearchCompany {
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
