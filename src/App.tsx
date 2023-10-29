import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Divider, Spinner } from "@chakra-ui/react";
import { ISchedule } from "./types/schedule.types";
import { getRaceTime } from "./utils";
import RaceCard from "./components/RaceCard/RaceCard";
import Header from "./components/Header/Header";

dayjs.extend(utc);

function saveStateToStorage(state: any) {
  chrome.storage.sync.set({ myExtensionState: state });
}

const getStorageData = (key: string) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError ? resolve({}) : resolve(result)
    )
  );

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<null | ISchedule>(null);
  const nextRaceIndex = schedule?.Races.findIndex((race) =>
    getRaceTime(race.date, race.time).isAfter(dayjs())
  );
  const [f1NotificationFlag, setF1NotificationFlag] = useState(false);

  const handleNotificationToggle = useCallback(async () => {
    if (schedule) {
      const state = (await getStorageData("myExtensionState")) as any;
      const f1NotificationFlag = state.myExtensionState?.f1NotificationFlag;

      if (!Number(f1NotificationFlag)) {
        saveStateToStorage({
          f1NotificationFlag: "1",
        });
        setF1NotificationFlag(true);
        chrome.runtime.sendMessage(process.env.CHROME_EXTENSION_ID, {
          type: "alarm",
          races: schedule.Races,
        });
      } else {
        saveStateToStorage({
          f1NotificationFlag: "0",
        });
        setF1NotificationFlag(false);
        chrome.runtime.sendMessage(process.env.CHROME_EXTENSION_ID, {
          type: "clear-alarm",
        });
      }
    }
  }, [schedule]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://ergast.com/api/f1/2023.json");
        const data = await response.json() as any;

        setSchedule(data.MRData.RaceTable);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRaceData = async () => {
      try {
        const response = await fetch("https://abundant-harvest-calculator.glitch.me/socket");
        const data = await response.json() as any;

        console.log(data)
      } catch (err) {
        console.log("WS Error", err)
      }
    }

    fetchSchedule();
    fetchRaceData();
  }, []);

  useEffect(() => {
    const setInitialState = async () => {
      try {
        const state = (await getStorageData("myExtensionState")) as any;

        if (Object.keys(state).length > 0) {
          setF1NotificationFlag(
            !!Number(state.myExtensionState?.f1NotificationFlag)
          );
        }
      } catch (err) {
      }
    };

    setInitialState();
  }, []);

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
      {isLoading && (
        <div className='h-screen flex justify-center items-center'>
          <Spinner color='red.500' />
        </div>
      )}
      {schedule && (
        <Box w={"full"}>
          <Header
            schedule={schedule}
            f1NotificationFlag={f1NotificationFlag}
            handleNotificationToggle={handleNotificationToggle}
          />
          <Box mt='16'>
            {schedule.Races.map((race, index) => (
              <Box mb={4} key={index}>
                <RaceCard race={race} isNextRace={index === nextRaceIndex} />
                {index !== schedule.Races.length - 1 &&
                  index !== nextRaceIndex && <Divider />}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
