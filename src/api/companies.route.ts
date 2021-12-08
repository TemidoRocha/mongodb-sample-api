import { Router } from 'express';
import CompaniesCtrl from './companies.controller';

const router = Router();

// associate put, delete, and get(id)
router.route('/').get(CompaniesCtrl.apiGetRoutes);

export default router;
