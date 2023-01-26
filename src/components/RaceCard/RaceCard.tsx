import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { IRace } from "../../types/schedule.types";
import { getRaceTime } from "../../utils";

interface IRaceCard {
  race: IRace;
}

const RaceCard = ({ race }: IRaceCard) => {
  return (
    <Box
      borderRadius='2xl'
      backgroundColor='transparent'
      display='flex'
      flexDirection='row'
      color='whiteAlpha.600'
    >
      <Box
        p={4}
        borderTopLeftRadius='2xl'
        borderBottomLeftRadius='2xl'
        backgroundColor='transparent'
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
        <Text>
          {getRaceTime(race.date, race.time).local().format("D MMM, hh:mm A")}
        </Text>
        <Text>{race.raceName}</Text>
      </Box>
    </Box>
  );
};

export default RaceCard;
