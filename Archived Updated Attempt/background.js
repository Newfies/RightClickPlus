chrome.runtime.onInstalled.addListener(() => {
    // YouTube Menu
    chrome.contextMenus.create({
        id: "ytContextMenu",
        title: "[🌐] YouTube",
        contexts: ["all"],
        visible: false
    });

    chrome.contextMenus.create({
        id: "ytNoCookie",
        title: "NoCookie-ify Video",
        parentId: "ytContextMenu",  // Sub Item
        contexts: ["all"],
        visible: false
    });

    // Default Menu

    chrome.contextMenus.create({
        id: "DefaultContextMenu",
        title: "Default",
        contexts: ["all"],
        visible: false
    });

    chrome.contextMenus.create({
        id: "DefaultImage",
        title: "Image Tool",
        parentId: "DefaultContextMenu",  // Sub Item
        contexts: ["all"],
        visible: false
    });
});

// Show the appropriate context menu based on the active tab's URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const url = tab.url;

        // Enabling Based On Website
        if (url.includes("youtube.com")) {
            chrome.contextMenus.update("ytContextMenu", { visible: true });
            chrome.contextMenus.update("ytNoCookie", { visible: true });
        }
        // Enabling These By Default
        chrome.contextMenus.update("DefaultImage", { visible: true });
        chrome.contextMenus.update("DefaultContextMenu", { visible: true });
    }
});

// Handle context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "ytNoCookie") {
        chrome.tabs.executeScript(tab.id, { file: 'CS/YT/ytNoCookie.js' });
    } else if (info.menuItemId === "DefaultImage" && info.srcUrl) {  // Use srcUrl instead of imgUrl
        // Send a message to the content script with the clicked image's URL
        chrome.tabs.sendMessage(tab.id, {
            action: "replaceImage",
            imgUrl: info.srcUrl  // Corrected to srcUrl
        });
    }
});
