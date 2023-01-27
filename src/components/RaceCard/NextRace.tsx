import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { IRace } from "../../types/schedule.types";
import { getRaceTime } from "../../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IRaceCard {
  race: IRace;
}

const NextRace = ({ race }: IRaceCard) => {
  return (
    <Box
      borderRadius='2xl'
      backgroundColor='white'
      display='flex'
      flexDirection='row'
      color='black'
      cursor='pointer'
      onClick={() => {
        chrome.runtime.sendMessage("ajhjcmbbkmkbpjgkhdmlalbbohhfgjkn", {
          type: "alarm",
          round: race.round,
          options: {
            title: race.raceName,
            message: `Race starts ${getRaceTime(
              race.date,
              race.time
            ).fromNow()}`,
            iconUrl: "/logo192.png",
            type: "basic",
          },
        });
      }}
    >
      <Box
        p={4}
        borderTopLeftRadius='2xl'
        borderBottomLeftRadius='2xl'
        backgroundColor='red.400'
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        color='white'
      >
        <Text fontSize='x-small' fontWeight='semibold'>
          Round
        </Text>
        <Text fontSize={"xl"}>{race.round}</Text>
      </Box>
      <Box flex={1} textAlign='right' p={4}>
        <Text>
          {getRaceTime(race.date, race.time).local().format("D MMM, hh:mm A")}
        </Text>
        <Text>{race.raceName}</Text>
      </Box>
    </Box>
  );
};

export default NextRace;
