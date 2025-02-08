// Initialize the map with restricted bounds
const map = L.map('map', {
    center: [42.9, 71.3667],
    zoom: 12,
    minZoom: 10.5,
    maxZoom: 18,
    maxBounds: [
        [41.0, 68.5],  // Southwest corner
        [45.0, 74.5]   // Northeast corner
    ],
    zoomControl: false

});
setTimeout(() => {
    map.setView([42.9, 71.3667], 10);
}, 500);

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.createElement("button");

    toggleBtn.id = "toggleSidebar";
    toggleBtn.textContent = "☰";
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");

        // Move the button to the correct position
        if (sidebar.classList.contains("collapsed")) {
            toggleBtn.style.left = "10px"; // Move to left
        } else {
            toggleBtn.style.left = "310px"; // Stay next to sidebar
        }
    });
});

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

const DEV_MODE = true;

if (DEV_MODE) {
    const coordDisplay = L.control({ position: "bottomleft" });

    coordDisplay.onAdd = function () {
        this.div = L.DomUtil.create("div", "coordinate-display");
        this.div.style.padding = "5px";
        this.div.style.background = "rgba(0,0,0,0.7)";
        this.div.style.color = "white";
        this.div.style.borderRadius = "5px";
        this.div.style.fontSize = "14px";
        this.div.style.display = "none"; // Initially hidden
        return this.div;
    };

    coordDisplay.addTo(map);

    // Show coordinates when hovering over the map
    map.on("mousemove", function (e) {
        coordDisplay.div.style.display = "block";
        coordDisplay.div.innerHTML = ` ${e.latlng.lat.toFixed(5)},  ${e.latlng.lng.toFixed(5)}`;
    });

    // Hide when mouse leaves the map
    map.on("mouseout", function () {
        coordDisplay.div.style.display = "none";
    });
}

// Set default cursor style
map.getContainer().style.cursor = "default";

// When mouse moves over the map, set it to "grab"
map.on("mouseover", function () {
    map.getContainer().style.cursor = "grab";
});

// When mouse starts dragging, set cursor to "grabbing"
map.on("mousedown", function () {
    map.getContainer().style.cursor = "grabbing";
});

// When mouse is released, return to "grab"
map.on("mouseup", function () {
    map.getContainer().style.cursor = "grab";
});

// When mouse leaves the map, return to default
map.on("mouseout", function () {
    map.getContainer().style.cursor = "default";
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add administrative borders


// Layer for toponyms
const toponymLayer = L.layerGroup().addTo(map);
let activeMarker = null;

function loadToponyms(filterType = "all", searchQuery = "") {
    toponymLayer.clearLayers(); // Clear previous markers
    let foundMarkers = []; // Store all matching markers

    toponyms.forEach(toponym => {
        if (filterType !== "all" && toponym.type !== filterType) return;
        if (searchQuery && !toponym.name.toLowerCase().includes(searchQuery.toLowerCase())) return;

        // Default marker
        const normalIcon = L.icon({
            iconUrl: "marker.png",
            iconSize: [25, 25]
        });

        const marker = L.marker(toponym.coordinates).addTo(toponymLayer);

        marker.bindPopup(`
        <div style="text-align: center;">
            <img src="${toponym.image}" alt="${toponym.name}" ">
            <h3>${toponym.name}</h3>
            <p><b>Старое название:</b> ${toponym.old_name !== "None" ? toponym.old_name : "Нет данных"}</p>
            <p><b>Тип:</b> ${toponym.type}</p>
            <p><b>Происхождение:</b> ${toponym.origin}</p>
            <p><b>Описание:</b> ${toponym.description}</p>
        </div>
        `);

        foundMarkers.push(marker);

    });

    // Adjust the view based on found markers
    if (foundMarkers.length === 1) {
        // If only one result, zoom in and open popup
        map.setView(foundMarkers[0].getLatLng(), 15);
        foundMarkers[0].openPopup();
    } else if (foundMarkers.length > 1) {
        // If multiple results, fit all markers in view
        const group = L.featureGroup(foundMarkers);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
}

// Load initial toponyms
loadToponyms();

// Filter and search functionality
document.getElementById("applyFilter").addEventListener("click", () => {
    const typeFilter = document.getElementById("typeFilter").value;
    const searchQuery = document.getElementById("search").value;
    loadToponyms(typeFilter, searchQuery);
});

