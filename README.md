# Zhambyl Region Interactive Map Project

## Overview

An interactive web application showcasing key locations and historical sites in the Zhambyl region. The project provides a dynamic map interface where users can explore points of interest with descriptions, images, and an optional audio guide.

## Features

- Interactive map with clickable markers for locations
- Detailed information about each location (name, image, description, audio guide)
- Responsive design for mobile and desktop
- Light/Dark mode support
- Search and filtering for locations

## Tech Stack

- **Frontend:** HTML, CSS (Bootstrap), JavaScript
- **Backend:** Node.js, Express.js (if applicable for API data)
- **Data Storage:** JSON (or MongoDB if backend is implemented)
- **Map API:** Leaflet.js / Google Maps API
- **Additional:** Audio player for location descriptions

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Altynadamn/zhambyl-map.git
   cd zhambyl-map
   ```
2. Install dependencies (if using a backend):
   ```sh
   cd server
   npm install
   ```
3. Start the backend server (if applicable):
   ```sh
   npm start
   ```
4. Open the `index.html` file in the `client` folder to run the project.

## Usage

- Click on a location marker to see details.
- Use the search bar to find specific places.
- Switch between light and dark mode using the UI toggle.
- Play audio descriptions if available.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Commit changes: `git commit -m "Add new feature"`.
4. Push the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

