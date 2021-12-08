import { Router } from 'express';
import AirCtrl from './airRoutes.controller';

const router = Router();

/**
 * get the carriers by route adn alliance
 */
router.route('/carriersbyrouteandalliance').get(AirCtrl.apiGetCarriersByRouteandAlliance);

/**
 * get the source airports with an array of destinations with airline and carrier.
 * the amount of destinations
 * total number of source airports
 */
router
  .route('/sourceairports/dst-carriers-airline')
  .get(AirCtrl.apiGetDstCarriersAirlinesBySrcAirport);

/**
 * get the destination airports with an array of source with airline and carrier.
 * the amount of source airports
 * total number of destination airports
 */
router
  .route('/destinationairports/src-carriers-airline')
  .get(AirCtrl.apiGetSrcCarriersAirlinesByDstAirport);

export default router;
