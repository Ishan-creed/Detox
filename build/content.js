const YOUTUBE_API_KEY = ''; // Replace with your API key

let selectedCategories = [];

// Listener for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.videoIDs && message.videoIDs.length > 0) {
        console.log("Received video IDs: ", message.videoIDs);
        fetchVideoDetails(message.videoIDs, message.selectedCategories);
        
        console.log("Selected Categories: ", selectedCategories);
        monitorSearchInput(); // Start monitoring after categories are received
    }else {
        console.log('No video IDs found');
    }
});

// Function to monitor the search input
function monitorSearchInput() {
    const searchBox = document.querySelector('input#search'); // Adjust selector if necessary

    if (searchBox) {
        // Monitor input changes
        searchBox.addEventListener('input', () => {
            const searchTerm = searchBox.value.toLowerCase();
            console.log("Current search term:", searchTerm);
            if (shouldBlockSearch(searchTerm)) {
                blockSearch();
            }
        });

        // Prevent form submission if a blocked category is searched
        const searchForm = searchBox.closest('form'); // Find the search form to block submission
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                const searchTerm = searchBox.value.toLowerCase();
                console.log("Attempting to submit search term:", searchTerm);
                if (shouldBlockSearch(searchTerm)) {
                    event.preventDefault(); // Prevent form submission
                    alert("Search blocked due to selected categories.");
                }
            });
        }
    } else {
        console.log('Search box not found.');
    }
}

// Function to check if the search term matches any category
function shouldBlockSearch(searchTerm) {
    const words = searchTerm.split(/\s+/); // Split by whitespace
    const blocked = words.some(word => 
        selectedCategories.some(category => 
            word.toLowerCase() === category.toLowerCase()
        )
    );
    console.log("Should block search:", blocked, "for term:", searchTerm);
    return blocked;
}


function blockSearch() {
    alert("Search blocked due to selected categories.");
}
// Fetch video details based on IDs
function fetchVideoDetails(videoIDs, selectedCategories) {
    const maxIDsPerRequest = 50; // Max IDs allowed per request

    for (let i = 0; i < videoIDs.length; i += maxIDsPerRequest) {
        const chunk = videoIDs.slice(i, i + maxIDsPerRequest).join(',');

        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${chunk}&key=${YOUTUBE_API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching video details: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.items) {
                    data.items.forEach(video => {
                        const categoryId = video.snippet.categoryId;
                        if (selectedCategories.includes(categoryId)) {
                            blurVideoCard(video.id);
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching video details:', error));
    }
}

// Function to blur video cards and add overlay text
function blurVideoCard(videoID) {
    const videoCard = document.querySelector(`a[href*="/watch?v=${videoID}"]`);
    
    const cardContainer = videoCard ? videoCard.closest('ytd-rich-grid-media') : null;
    const metaElement = cardContainer ? cardContainer.querySelector('#meta') : null;

    if (videoCard) {
        videoCard.style.filter = 'blur(20px)';
        videoCard.style.pointerEvents = 'none';
        videoCard.style.borderRadius = '20px';

        const overlayText = document.createElement('div');
        overlayText.innerText = 'Video Blocked';
        overlayText.style.position = 'absolute';
        overlayText.style.top = '50%';
        overlayText.style.left = '50%';
        overlayText.style.transform = 'translate(-50%, -50%)';
        overlayText.style.fontSize = '24px';
        overlayText.style.fontWeight = 'bold';
        overlayText.style.pointerEvents = 'none';
        overlayText.style.zIndex = '10';
        overlayText.style.textAlign = 'center';

        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const blockOverlay = document.createElement('div');
        blockOverlay.style.position = 'absolute';
        blockOverlay.style.top = '0';
        blockOverlay.style.left = '0';
        blockOverlay.style.width = '100%';
        blockOverlay.style.height = '100%';
        blockOverlay.style.borderRadius = '12px';
        blockOverlay.style.backgroundColor = isDarkMode ? 'black' : 'white';
        blockOverlay.style.zIndex = '5';
        blockOverlay.style.pointerEvents = 'auto';

        overlayText.style.color = isDarkMode ? 'white' : 'black';

        cardContainer.style.position = 'relative';
        cardContainer.appendChild(overlayText);
        cardContainer.appendChild(blockOverlay); 

        console.log(`Blur applied to video card for ID: ${videoID}`);
    } else {
        console.log(`No video card found for ID: ${videoID}`);
    }

    if (metaElement) {
        metaElement.style.filter = 'blur(20px)';
        metaElement.style.pointerEvents = 'none';
    }
}

// Initialize monitoring
monitorSearchInput();
