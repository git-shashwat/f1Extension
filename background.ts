chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed!");
});

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "alarm") {
    chrome.notifications.clear(data.round, (wasCleared) => {
      if (wasCleared) {
        //store round data in local storage for notification to pick up
        chrome.storage.local.set({
          [data.round]: data.options,
        });

        //set alarm
        chrome.alarms.create(data.round, {
          when: Date.now() + 3000,
        });
      }
    });
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const notifications = await chrome.storage.local.get(alarm.name);
  const round = notifications[Object.keys(notifications)[0]];

  chrome.notifications.create(alarm.name, round);
});
