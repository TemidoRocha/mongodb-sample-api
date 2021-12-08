export interface GetCarriersByRouteandAlliance {
  _id: string;
  carrriers: string[];
  totalCarriers: number;
}

export interface GetDstCarriersAirlinesBySrcAirport {
  srcAirports: DstCarriersAirlinesBySrcAirport[];
  page: number;
  entries_per_page: number;
}

export interface DstCarriersAirlinesBySrcAirport {
  _id: string;
  destinations: DstForDstCarriersAirlinesBySrcAirport;
}

export interface DstForDstCarriersAirlinesBySrcAirport {
  dst_airport: string;
  airline: string;
  airplane: string;
}

export interface GetSrcCarriersAirlinesByDstAirport {
  dstAirports: SrcCarriersAirlinesByDstAirport[];
  page: number;
  entries_per_page: number;
}

export interface SrcCarriersAirlinesByDstAirport {
  _id: string;
  sources: SrcForSrcCarriersAirlinesByDstAirport;
}

export interface SrcForSrcCarriersAirlinesByDstAirport {
  src_airport: string;
  airline: string;
  airplane: string;
}
