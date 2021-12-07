import AirDAO from '../dao/airDAO';
import { Request, Response, NextFunction } from 'express';

export default class MoviesController {
  static async apiGetRoutes(req: Request, res: Response, next: NextFunction) {
    const airCompanies = await AirDAO.getAirCompanies();
    res.json(airCompanies);
  }
}
