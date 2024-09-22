
# **YouTube Category Blocker - Detox Your Feed**

Welcome to the **YouTube Category Blocker** project! This extension allows users to take control of their YouTube experience by blocking certain categories from appearing in their feed. If you're tired of seeing videos from specific categories that don't interest you, this extension is the perfect solution.

## **Features**

- Select multiple YouTube video categories that you want to block.
- Lightweight, fast, and easy-to-use interface.
- Automatically filters out unwanted content from your feed based on selected categories.
- Simple reset functionality to clear all blocked categories.

## **Screenshots**

![Demo Screenshot](https://github.com/Ishan-creed/Detox/blob/main/Screenshot%20(527).png)

## **How to Use**

1. **Install the Extension**:
   - Clone the repository or download the ZIP file of the project.
   - Extract the files into a local folder.

2. **Load the Extension in Chrome**:
   - Open **Google Chrome** and navigate to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the top-right corner.
   - Click on the **"Load unpacked"** button and select the folder where you extracted the project files (the `build` folder).

3. **Set Categories to Block**:
   - Once the extension is loaded, click on the extension icon in the Chrome toolbar.
   - The popup will display a list of YouTube categories.
   - Select the categories you want to block by checking the checkboxes.

4. **Activate Filtering**:
   - After selecting your categories, click the **"Detox"** button to apply the filters.
   - YouTube videos from the selected categories will no longer appear in your feed.

5. **Reset Filters**:
   - To reset the filters and unblock all categories, simply click the **"Reset"** button.

## **Requirements**

- **Google Chrome** browser (latest version recommended).
- **Node.js** installed for running local builds (optional if using GitHub version).

## **Installation**

### **Option 1: Install via Local Files**
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/Ishan-creed/Detox.git
   ```
2. Navigate to the project directory:
   ```bash
   cd build
   ```
3. Open Chrome and follow the instructions under the **How to Use** section to load the unpacked extension.

### **Option 2: Install via Build Folder**
1. If you're using the pre-built extension (the `build` folder), navigate to:
   ```bash
   chrome://extensions/
   ```
2. Enable **Developer Mode** and select **Load Unpacked**.
3. Choose the `build` folder you downloaded.

## **Development Setup**

To contribute or further develop the project, follow the instructions below:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ishan-creed/Detox.git
   ```
   

2. Open Chrome in developer mode and load the unpacked extension from the `build` folder.

## **Usage**

1. After installing the extension, click on the extension icon in the Chrome toolbar.
2. A popup will appear with a list of categories you can block.
3. Select or deselect categories, and click on the **"Detox"** button to apply the changes to your YouTube feed.
4. Use the **"Reset"** button to remove all applied category blocks and reset the settings.

## **File Structure**

```bash
├── build/                    # Production-ready build files
│   ├── popup.html             # HTML file for the extension popup
│   ├── popup.js               # JavaScript file for handling user actions
│   ├── manifest.json          # Chrome extension configuration
│   └── styles.css             # Custom styles for the popup
└── README.md                  # This README file
```

## **Technologies Used**

- **HTML5**: For creating the popup interface.
- **CSS3**: For styling the popup and making it visually appealing.
- **JavaScript (ES6)**: Handles the logic of selecting categories and filtering content.
- **Chrome Extensions API**: For interacting with the browser and YouTube content.
- **YouTube V3 API**


## **Known Issues & Troubleshooting**

- **Video Blocking Inconsistencies**: In rare cases, YouTube may dynamically load content, causing videos from blocked categories to briefly appear before being filtered out.
- **Category Changes**: YouTube occasionally updates or changes its video category structure, which may cause certain categories not to be blocked. Regular updates to this extension will address these changes.

## **Future Improvements**

- Add a user-customizable category option where users can enter their own categories or keywords.
- Provide a visual notification when a category is successfully blocked.
- Offer support for filtering content on the YouTube homepage and recommended section.
- Supported mobile device's solution



## **Acknowledgments**

- This project was inspired by the need to help users control their YouTube recommendations.
- Special thanks to the open-source community for the tools and libraries that made this project possible.

---

Feel free to replace placeholder texts like `path/to/your/image.jpg`, repository URLs, and other content that fits your project.

This `README.md` provides a clear, structured guide for users and developers to understand the project, use it effectively, and contribute to its improvement.
