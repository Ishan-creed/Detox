// Initialize an empty array to store video IDs and last ID
let videoIDs = [];
let lastVideoID = null;
let selectedCategories = []; // Keep track of selected categories
let autoFetchInterval; // Variable to hold the interval ID

// Listener for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startFetching") {
    selectedCategories = message.selectedCategories; // Save selected categories
    fetchAndSendVideoIDs(); // Fetch immediately
    startAutoFetch(); // Start auto-fetching every 5 seconds
  }

  if (message.action === "stopBlocking") {
    stopAutoFetch(); // Stop auto-fetching
    videoIDs = []; // Clear the video IDs array
    lastVideoID = null; // Reset the last video ID
    console.log("Stopped blocking videos.");

    // Notify content script to undo any blurring
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "resetBlocking" });
    });

    // Send response back to popup.js
    sendResponse({ success: true });
}


  if (message.action === "saveUserName") {
    const userName = message.userName;

    // You can process the username here (e.g., save it in storage)
    // For example, saving to chrome.storage
    chrome.storage.local.set({ userName: userName }, () => {
        // Now forward the username to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "receiveUserName", userName }, (response) => {
                sendResponse({ success: true });
            });
        });
    });

    // Keep the message channel open for asynchronous response
    return true;
}

});



// Function to fetch and send video IDs
function fetchAndSendVideoIDs() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: fetchYouTubeVideoIDs, // This runs in content script
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      // Replace the videoIDs array with new values
      const newVideoIDs = results[0].result;

      // Filter to find new IDs
      const filteredVideoIDs = newVideoIDs.filter(videoID => videoID !== lastVideoID);

      if (filteredVideoIDs.length > 0) {
        // Update the lastVideoID to the latest
        lastVideoID = filteredVideoIDs[0];

        // Update the videoIDs array with filtered new values
        videoIDs = filteredVideoIDs;

        // Log the updated IDs for debugging
        console.log('Updated Video IDs:', videoIDs);

        // Send the collected video IDs and selected categories to the content script
        chrome.tabs.sendMessage(tabs[0].id, { videoIDs, selectedCategories });
      }
    });
  });
}

// Function to check for new video IDs every 5 seconds
function startAutoFetch() {
  autoFetchInterval = setInterval(() => {
    fetchAndSendVideoIDs(); // Call the fetch function
  }, 2000);
}

// Function to stop auto-fetching
function stopAutoFetch() {
  clearInterval(autoFetchInterval);
}

// Function to fetch video IDs from the YouTube page (runs in content script context)
function fetchYouTubeVideoIDs() {
  const videoIDs = [];
  const videoElements = document.querySelectorAll('a#video-title-link');

  videoElements.forEach(video => {
    const videoURL = video.href;
    const videoID = new URL(videoURL).searchParams.get('v');

    if (videoID) {
      videoIDs.push(videoID);
    }
  });

  return videoIDs; // Return video IDs to the callback
}
