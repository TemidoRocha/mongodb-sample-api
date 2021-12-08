import { Router } from 'express';
import AirCtrl from './airRoutes.controller';

const router = Router();

// associate put, delete, and get(id)
router.route('/carriersbyrouteandalliance').get(AirCtrl.apiGetCarriersByRouteandAlliance);

export default router;
