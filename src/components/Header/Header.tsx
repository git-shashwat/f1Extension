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
      position='sticky'
      display='flex'
      flexDir='row'
      alignItems='center'
      justifyContent='space-between'
      backgroundColor='#0A0A00'
      top={10}
      left={0}
      zIndex={1}
      padding='2'
      className="border-b-2 border-[#A8BBB0]"
    >
      <Text
        fontSize='2xl'
        fontWeight='semibold'
        color='#EBE8E0'
        letterSpacing='wide'
        marginBottom='4'
      >
        <span
          style={{
            display: "inline",
            color: "#A8BBB0",
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
        <Text textColor='#EBE8E0' fontSize='xs' mt='2'>
          Turn {f1NotificationFlag ? "off" : "on"} notifications
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
