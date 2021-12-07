import { Router } from 'express';
import AirCtrl from './air.controller';

const router = Router();

// associate put, delete, and get(id)
router.route('/').get(AirCtrl.apiGetRoutes);

export default router;
