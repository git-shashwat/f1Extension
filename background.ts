const getRaceTime = (date: string, time: string) => {
  return date + "T" + time;
};

const getStorageData = (key: string) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed!");
});

chrome.runtime.onMessage.addListener(async (data) => {
  if (data.type === "alarm") {
    await chrome.storage.sync.set(
      Object.fromEntries(data.races.map((race) => [race.round, race]))
    );

    data.races
      .filter(
        (race) =>
          new Date(getRaceTime(race.date, race.time)).valueOf() >
          new Date().valueOf()
      )
      .forEach((race) => {
        chrome.alarms.create(race.round, {
          when:
            new Date(getRaceTime(race.date, race.time)).valueOf() -
            30 * 60 * 1000,
        });
      });
  } else if (data.type === "clear-alarm") {
    await chrome.storage.sync.clear();
    await chrome.alarms.clearAll();
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const notification = (await getStorageData(alarm.name)) as any;
  const race = Object.values(notification)[0] as any;

  if (race) {
    chrome.notifications.create(alarm.name, {
      type: "basic",
      title: race.raceName,
      message: `Race starts in 30 minutes.`,
      iconUrl: "/F1.png",
    });
  }
});
