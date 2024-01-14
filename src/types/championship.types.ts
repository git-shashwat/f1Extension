export type DriverStandingsApiResponse = {
  MRData: {
      StandingsTable: {
          StandingsLists: Array<{
              season: string;
              round: string;
              DriverStandings: DriverStandings;
          }>
      }
  }
};

export type ConstructorStandingsApiResponse = {
  MRData: {
      StandingsTable: {
          StandingsLists: Array<{
              season: string;
              round: string;
              ConstructorStandings: ConstructorStandings;
          }>
      }
  }
};

export type Driver =  {
    driverId: string;
    permanentNumber?: string;
    code?: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export type Constructor = {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
};


export type DriverStandings = Array<{
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Array<Constructor>;
}>

export type ConstructorStandings = Array<{
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}>;

