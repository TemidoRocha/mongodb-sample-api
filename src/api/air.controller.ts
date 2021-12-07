import AirDAO from '../dao/airDAO';
import AirServices from '../services/air.services';
import { Request, Response, NextFunction } from 'express';

export default class MoviesController {
  static async apiGetRoutes(req: Request, res: Response, next: NextFunction) {
    const airSearchConfig = AirServices.airSearchCompany(req, res);
    const airCompanies = await AirDAO.getAirCompanies(airSearchConfig);
    res.json(airCompanies);
  }
}
