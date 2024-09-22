// Event listener for the fetch button
document.getElementById('fetchVideos').addEventListener('click', () => {
    const selectedCategories = Array.from(document.querySelectorAll('#category-selection input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.value);
  
    // Send message to background script to start fetching video IDs
    chrome.runtime.sendMessage({
      action: "startFetching",
      selectedCategories: selectedCategories
    });
    
    alert("The selected categories have been blocked.");

});

// document.getElementById('saveNameButton').addEventListener('click', () => {
//     const userName = document.getElementById('userName').value.trim(); // Get and trim the user's name

//     if (userName) {
//         // Send the user's name to the background script
//         chrome.runtime.sendMessage({ action: "saveUserName", userName }, (response) => {
//             if (response && response.success) {
//                 console.log("User name sent to background script:", userName);
//                 alert("Name sent to background script successfully!");
//             } else {
//                 console.error("Failed to send name to background script:", response.error);
//                 alert("Failed to send name to background script.");
//             }
//         });
//     } else {
//         alert("Please enter a valid name.");
//     }
// });




// Event listener for the reset button
// Event listener for the reset button
document.getElementById('reset').addEventListener('click', () => {

    console.log("Reset")
    // Send message to the background script to stop blocking videos
    chrome.runtime.sendMessage({ action: "stopBlocking" }, (response) => {
        if (response && response.success) {
            console.log("Stopped blocking videos.");
            alert("Video blocking has been stopped.");
        } else {
            console.error("Failed to stop blocking videos.");
            alert("Failed to stop blocking videos.");
        }
    });

    // Reload the current YouTube page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id); // Reload the current tab
        }
    });

    // Reload the extension popup
    window.location.reload(); // Reload the popup
});
