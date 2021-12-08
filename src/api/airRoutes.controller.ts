import AirDAO from '../dao/airDAO';
import SearchServices from '../services/searchServices.services';
import { Request, Response, NextFunction } from 'express';

export default class AirController {
  static async apiGetCarriersByRouteandAlliance(req: Request, res: Response, next: NextFunction) {
    let { source, destination } = req.params;
    const airCompanies = await AirDAO.getCarriersByRouteandAlliance(source, destination);
    res.json(airCompanies);
  }
}
