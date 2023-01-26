import dayjs from "dayjs";

const getRaceTime = (date: string, time: string) => {
  return dayjs(date + "T" + time);
};

export default getRaceTime;
