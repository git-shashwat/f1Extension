import React from "react";
import { DriverStandings } from "../../../types/championship.types";
import { getDriverImage } from "../../../utils";
import { Divider } from "@chakra-ui/react";

interface Props {
  driverStandings: DriverStandings | null;
}

function DriversStanding({ driverStandings }: Props) {
  const isTopThree = (position: string) => {
    return parseInt(position) < 4;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-y-1'>
        {driverStandings?.map((driverStanding, index) => (
          <div key={driverStanding.Driver.driverId} className="flex flex-col w-full">
            <div className="flex items-start justify-between pl-2 py-1">
              <div className='flex flex-col gap-y-2'>
                <div className={`flex items-end gap-x-2 text-brand-yellow font-semibold ${isTopThree(driverStanding.position) ? 'text-3xl' : 'text-xl'}`}>
                  <h1>
                    #{driverStanding.position}
                  </h1>
                  <h1>
                    {driverStanding.Driver.givenName} {driverStanding.Driver.familyName}
                  </h1>
                </div>
                <h2 className={`text-brand-white ${isTopThree(driverStanding.position) ? 'text-lg' : 'text-sm'}`}>
                    {driverStanding.points} points | {driverStanding.Constructors[0].name}
                </h2>
              </div>
              <img 
                  width={isTopThree(driverStanding.position) ? "30%" : "20%"}
                  src={getDriverImage(driverStanding.Driver)} 
                  alt={`${driverStanding.Driver.givenName} ${driverStanding.Driver.familyName}`}
                  className="-mb-1"
              />
            </div>
            {index !== driverStandings.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriversStanding;
