import React, { useEffect } from 'react';
import { Spinner, Switch } from '@chakra-ui/react';
import DriversStanding from './Drivers/DriversStanding';
import ConstructorsStanding from './Constructors/ConstructorsStanding';
import { ConstructorStandings, ConstructorStandingsApiResponse, DriverStandings, DriverStandingsApiResponse } from '../../types/championship.types';

const Championship = () => {
  const [isDrivers, setIsDrivers] = React.useState(true);
  const [driverStandings, setDriverStandings] = React.useState<DriverStandings | null>(null);
  const [constructorStandings, setConstructorStandings] = React.useState<ConstructorStandings | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {

        const driverStandings = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
        const driverStandingsData = await driverStandings.json() as DriverStandingsApiResponse;
        setDriverStandings(driverStandingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        const constructorStandings = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
        const constructorStandingsData = await constructorStandings.json() as ConstructorStandingsApiResponse;
        setConstructorStandings(constructorStandingsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStandings();
  }, [isDrivers]);

  return (
  <div className='flex flex-col bg-gradient-to-t from-[#004080] to-[#606060]'>
    {!(driverStandings || constructorStandings) && (
        <div className='h-screen flex justify-center items-center'>
          <Spinner color='red.500' />
        </div>
    )}
    <div className='sticky top-10 bg-brand-black z-50 flex items-center gap-x-2 justify-end  text-brand-white p-2'>
      <p>
        Drivers
      </p>
      <Switch colorScheme='red' onChange={(e) => setIsDrivers(!e.currentTarget.checked)} />
      <p>
        Constructors
      </p>
      </div>
    {isDrivers ? <DriversStanding driverStandings={driverStandings} /> : <ConstructorsStanding constructorStandings={constructorStandings} />}
  </div>
  );
}

export default Championship;