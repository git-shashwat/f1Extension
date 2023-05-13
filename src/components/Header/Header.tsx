import React from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import {
  MdOutlineNotifications,
  MdOutlineNotificationsOff,
} from "react-icons/md";
import { ISchedule } from "../../types/schedule.types";

interface HeaderProps {
  schedule: ISchedule;
  f1NotificationFlag: boolean;
  handleNotificationToggle: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({
  schedule,
  f1NotificationFlag,
  handleNotificationToggle,
}) => {
  return (
    <Box
      position='fixed'
      display='flex'
      flexDir='row'
      alignItems='center'
      justifyContent='space-between'
      mb='8'
      backgroundColor='black'
      top={0}
      left={0}
      width='100%'
      zIndex={1}
      padding='2'
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
            !f1NotificationFlag ? (
              <MdOutlineNotificationsOff />
            ) : (
              <MdOutlineNotifications />
            )
          }
          borderRadius='full'
          onClick={handleNotificationToggle}
        />
        <Text textColor='whiteAlpha.600' fontSize='xs' mt='2'>
          Turn {f1NotificationFlag ? "off" : "on"} notifications
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
