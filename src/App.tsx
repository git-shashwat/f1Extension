import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Divider, Spinner, Text } from "@chakra-ui/react";

dayjs.extend(utc);

interface IRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  ThirdPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
}
interface ISchedule {
  season: string;
  Races: IRace[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<null | ISchedule>(null);
  const getRaceTime = (date: string, time: string) => {
    return dayjs(date + "T" + time);
  };
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
            <Box mb={4}>
              <Box
                key={race.round as React.Key}
                borderRadius='2xl'
                backgroundColor={
                  index === nextRaceIndex ? "white" : "transparent"
                }
                display='flex'
                flexDirection='row'
                color={index === nextRaceIndex ? "black" : "whiteAlpha.600"}
              >
                <Box
                  p={4}
                  borderTopLeftRadius='2xl'
                  borderBottomLeftRadius='2xl'
                  backgroundColor={
                    index === nextRaceIndex ? "red.400" : "transparent"
                  }
                  display='flex'
                  flexDir='column'
                  justifyContent='center'
                  alignItems='center'
                  color={index === nextRaceIndex ? "white" : ""}
                >
                  <Text fontSize='x-small' fontWeight={"semibold"}>
                    Round
                  </Text>
                  <Text fontSize={"xl"}>{race.round}</Text>
                </Box>
                <Box flex={1} textAlign='right' p={4}>
                  <Text>
                    {getRaceTime(race.date, race.time)
                      .local()
                      .format("D MMM, hh:mm A")}
                  </Text>
                  <Text>{race.raceName}</Text>
                </Box>
              </Box>
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
