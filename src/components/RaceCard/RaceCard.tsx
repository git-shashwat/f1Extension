import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { IRace } from "../../types/schedule.types";
import { getRaceTime } from "../../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IRaceCard {
  race: IRace;
  isNextRace: boolean;
}

const RaceCard = ({ race, isNextRace = false }: IRaceCard) => {
  const nextRaceCardRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (nextRaceCardRef.current) {
      nextRaceCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <Tooltip
      label={`${
        race.Sprint
          ? `Sprint: ${getRaceTime(race.Sprint.date, race.Sprint.time)
              .local()
              .format("hh:mm A")} |`
          : ""
      } Qualifying:  ${getRaceTime(race.Qualifying.date, race.Qualifying.time)
        .local()
        .format("hh:mm A")}`}
      placement='auto'
      className='!bg-[#81B622]'
    >
      <Box
        ref={isNextRace ? nextRaceCardRef : null}
        backgroundColor={isNextRace ? "white" : "transparent"}
        color={isNextRace ? "black" : "whiteAlpha.600"}
        className='w-full flex flex-row !rounded-2xl hover:scale-105 transition-all mb-3'
      >
        <Box
          p={4}
          borderTopLeftRadius='2xl'
          borderBottomLeftRadius='2xl'
          backgroundColor={isNextRace ? "red.400" : "transparent"}
          color={isNextRace ? "white" : ""}
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
        >
          <Text fontSize='x-small' fontWeight='semibold'>
            Round
          </Text>
          <Text fontSize={"xl"}>{race.round}</Text>
        </Box>
        <Box flex={1} textAlign='right' p={4}>
          <p className='font-bold'>
            {getRaceTime(race.date, race.time).local().format("D MMM, hh:mm A")}
          </p>
          <Text>{race.raceName}</Text>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default RaceCard;
