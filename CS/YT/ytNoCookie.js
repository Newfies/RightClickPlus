// Get the current URL
var currentUrl = window.location.href;

// Check if the URL contains "watch?v="
if (currentUrl.includes("v=")) {
    // Extract the video ID from the URL
    var videoId = new URLSearchParams(new URL(currentUrl).search).get("v");
    
    if (videoId) {
        // Create the new link based on the extracted video ID
        var newLink = `https://www.youtube-nocookie.com/embed/${videoId}?playlist=${videoId}&autoplay=1&iv_load_policy=3&loop=1&start=`;

        console.log("New Link:", newLink);
        
        // Redirect to the new link
        window.location.href = newLink;
    } else {
        console.log("No video ID found.");
    }
} else {
    console.log("Not a YouTube watch page.");
}
