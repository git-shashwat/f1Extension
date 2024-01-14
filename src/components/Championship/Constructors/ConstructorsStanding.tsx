import React from "react";
import { ConstructorStandings } from "../../../types/championship.types";
import { Divider } from "@chakra-ui/react";
import { getTeamImage } from "../../../utils";

interface Props {
  constructorStandings: ConstructorStandings | null;
}

function ConstructorsStanding({ constructorStandings }: Props) {
  const isTopThree = (position: string) => {
    return parseInt(position) < 4;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-y-1'>
        {constructorStandings?.map((constructorStanding, index) => (
          <div key={constructorStanding.Constructor.constructorId} className="flex flex-col w-full">
            <div className="flex items-start justify-between pl-2 py-1">
              <div className='flex flex-col gap-y-2'>
                <div className={`flex items-end gap-x-2 text-brand-yellow font-semibold ${isTopThree(constructorStanding.position) ? 'text-3xl' : 'text-xl'}`}>
                  <h1>
                    #{constructorStanding.position}
                  </h1>
                  <h1>
                    {constructorStanding.Constructor.name}
                  </h1>
                </div>
                <h2 className={`text-brand-white ${isTopThree(constructorStanding.position) ? 'text-lg' : 'text-sm'}`}>
                    {constructorStanding.points} points
                </h2>
              </div>
              <img 
                  width={isTopThree(constructorStanding.position) ? "30%" : "20%"}
                  src={getTeamImage(constructorStanding.Constructor)} 
                  alt={constructorStanding.Constructor.name}
                  className="-mb-1"
              />
            </div>
            {index !== constructorStandings.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConstructorsStanding;
