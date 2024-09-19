// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceImage" && request.imgUrl) {
        // Find the image element that was clicked by matching its src attribute
        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            if (img.src === request.imgUrl) {
                // Replace the image source with a random image
                img.src = "https://via.placeholder.com/300";  // Random image
            }
        });
    }
});
