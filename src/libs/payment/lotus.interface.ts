export interface Bank {
  institutioncode: string;
  institutionname: string;
}

export interface GetBanksResponse {
  Banks: Bank[];
}
