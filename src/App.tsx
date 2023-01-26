import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { ISchedule } from "./types/schedule.types";
import { getRaceTime } from "./utils";
import RaceCard from "./components/RaceCard/RaceCard";
import NextRace from "./components/RaceCard/NextRace";

dayjs.extend(utc);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<null | ISchedule>(null);
  const nextRaceIndex = schedule?.Races.findIndex((race) =>
    getRaceTime(race.date, race.time).isAfter(dayjs())
  );

  const fetchSchedule = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://ergast.com/api/f1/2023.json");
      const data = await response.json();

      setSchedule(data.MRData.RaceTable);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return (
    <Box
      p={4}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      bgGradient='linear(to-br, gray.700, gray.900)'
      fontFamily='Montserrat, sans-serif'
    >
      {isLoading && <Spinner color='red.500' />}
      {schedule && (
        <Box w={"full"}>
          <Text
            fontSize='2xl'
            fontWeight='semibold'
            color='white'
            letterSpacing='wide'
            marginBottom='4'
          >
            {schedule.season} Season
          </Text>
          {schedule.Races.map((race, index) => (
            <Box mb={4} key={index}>
              {index === nextRaceIndex ? (
                <NextRace race={race} />
              ) : (
                <RaceCard race={race} />
              )}
              {index !== schedule.Races.length - 1 &&
                index !== nextRaceIndex && <Divider />}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default App;
