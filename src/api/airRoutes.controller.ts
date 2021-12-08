import AirDAO from '../dao/airDAO';
import SearchServices from '../services/searchServices.services';
import { Request, Response, NextFunction } from 'express';

export default class AirController {
  //
  static async apiGetCarriersByRouteandAlliance(req: Request, res: Response, next: NextFunction) {
    let { source, destination } = req.query;
    const airCompanies = await AirDAO.getCarriersByRouteandAlliance(
      source as string,
      destination as string
    );
    res.json(airCompanies);
  }

  //
  static async apiGetDstCarriersAirlinesBySrcAirport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const searchConfig = SearchServices.searchPagination(req, res);
    const srcAirport = await AirDAO.getDstCarriersAirlinesBySrcAirport(searchConfig);
    res.json(srcAirport);
  }

  //
  static async apiGetSrcCarriersAirlinesByDstAirport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const searchConfig = SearchServices.searchPagination(req, res);
    const dstAirport = await AirDAO.getSrcCarriersAirlinesByDstAirport(searchConfig);
    res.json(dstAirport);
  }
}
