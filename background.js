chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "ytContextMenu",
        title: "YouTube Video To No Cookie",
        contexts: ["all"],
        visible: false
    });

    chrome.contextMenus.create({
        id: "otherContextMenu",
        title: "Other Site Menu Item",
        contexts: ["all"],
        visible: false
    });
});

// Show the appropriate context menu based on the active tab's URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const url = tab.url;

        // Set visibility based on the website
        if (url.includes("youtube.com")) {
            chrome.contextMenus.update("ytContextMenu", { visible: true });
            chrome.contextMenus.update("otherContextMenu", { visible: true });
        } else {
            chrome.contextMenus.update("ytContextMenu", { visible: false });
            chrome.contextMenus.update("otherContextMenu", { visible: true });
        }
    }
});

// Handle context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "ytContextMenu") {
        chrome.tabs.executeScript(tab.id, { file: 'CS/YT/ytScript.js' });
    } else if (info.menuItemId === "otherContextMenu") {
        console.log("Other site menu item clicked");
    }
});