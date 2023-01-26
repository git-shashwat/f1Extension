chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "sampleContextMenu",
        title: "Sample Context Menu",
        contexts: ["selection"]
    });
});
chrome.runtime.onMessage.addListener(function (data) {
    if (data.type === "notification") {
        chrome.notifications.create("ABC", data.options);
    }
});
chrome.bookmarks.onCreated.addListener(function () {
    console.log("Bookmark created");
});
