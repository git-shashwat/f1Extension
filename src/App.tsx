import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Divider, IconButton, Spinner, Text } from "@chakra-ui/react";
import { ISchedule } from "./types/schedule.types";
import { getRaceTime } from "./utils";
import RaceCard from "./components/RaceCard/RaceCard";
import {
  MdOutlineNotifications,
  MdOutlineNotificationsOff,
} from "react-icons/md";

dayjs.extend(utc);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<null | ISchedule>(null);
  const [isNotificationsOn, setIsNotificationsOn] = useState(
    !!Number(localStorage.getItem("f1NotificationFlag"))
  );
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

  const handleNotificationToggle = useCallback(async () => {
    if (schedule) {
      const notificationFlag = localStorage.getItem("f1NotificationFlag");
      if (!Number(notificationFlag)) {
        setIsNotificationsOn(true);
        localStorage.setItem("f1NotificationFlag", "1");
        chrome.runtime.sendMessage(process.env.CHROME_EXTENSION_ID, {
          type: "alarm",
          races: schedule.Races,
        });
      } else {
        setIsNotificationsOn(false);
        localStorage.setItem("f1NotificationFlag", "0");
        chrome.runtime.sendMessage(process.env.CHROME_EXTENSION_ID, {
          type: "clear-alarm",
        });
      }
    }
  }, [schedule]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  useEffect(() => {
    handleNotificationToggle();
  }, [handleNotificationToggle]);

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
          <Box
            display='flex'
            flexDir='row'
            justifyContent='space-between'
            mb='8'
          >
            <Text
              fontSize='2xl'
              fontWeight='semibold'
              color='white'
              letterSpacing='wide'
              marginBottom='4'
            >
              <span
                style={{
                  display: "inline",
                  color: "red",
                }}
              >
                {schedule.season}
              </span>{" "}
              Season
            </Text>
            <Box display='flex' flexDir='column' alignItems='flex-end'>
              <IconButton
                aria-label='notification'
                icon={
                  isNotificationsOn ? (
                    <MdOutlineNotificationsOff />
                  ) : (
                    <MdOutlineNotifications />
                  )
                }
                borderRadius='full'
                onClick={handleNotificationToggle}
              />
              <Text textColor='whiteAlpha.600' fontSize='xs' mt='2'>
                Turn {isNotificationsOn ? "off" : "on"} notifications
              </Text>
            </Box>
          </Box>
          {schedule.Races.map((race, index) => (
            <Box mb={4} key={index}>
              <RaceCard race={race} isNextRace={index === nextRaceIndex} />
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
