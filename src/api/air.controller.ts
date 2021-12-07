import AirDAO from '../dao/airDAO';
import SearchServices from '../services/searchServices.services';
import { Request, Response, NextFunction } from 'express';

export default class MoviesController {
  static async apiGetRoutes(req: Request, res: Response, next: NextFunction) {
    const airSearchConfig = SearchServices.searchPagination(req, res);
    const airCompanies = await AirDAO.getAirCompanies(airSearchConfig);
    res.json(airCompanies);
  }
}
