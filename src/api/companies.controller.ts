import CompaniesDAO from '../dao/companiesDAO';
import SearchServices from '../services/searchServices.services';
import { Request, Response, NextFunction } from 'express';

export default class CompaniesController {
  static async apiGetCompanies(req: Request, res: Response, next: NextFunction) {
    const airSearchConfig = SearchServices.searchPagination(req, res);
    const airCompanies = await CompaniesDAO.getCompanies(airSearchConfig);
    res.json(airCompanies);
  }
}
