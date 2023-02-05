const getRaceTime = (date: string, time: string) => {
  return date + "T" + time;
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed!");
});

chrome.runtime.onMessage.addListener(async (data) => {
  if (data.type === "alarm") {
    await chrome.storage.local.set(
      Object.fromEntries(data.races.map((race, index) => [index, race]))
    );

    data.races.forEach((race) => {
      chrome.alarms.create(race.round, {
        when:
          new Date(getRaceTime(race.date, race.time)).valueOf() -
          30 * 60 * 1000,
      });
    });
  } else if (data.type === "clear-alarm") {
    await chrome.storage.local.clear();
    await chrome.alarms.clearAll();
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const notification = await chrome.storage.local.get(alarm.name);
  const race = Object.values(notification)[0];

  chrome.notifications.create(alarm.name, {
    type: "basic",
    title: race.Circuit.circuitName,
    message: `Race starts in 30 minutes.`,
    iconUrl: "/F1.png",
  });
});
