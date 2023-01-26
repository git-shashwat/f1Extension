chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"],
  });
});

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notification") {
    chrome.notifications.create("ABC", data.options);
  }
});
