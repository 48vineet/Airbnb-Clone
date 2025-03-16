mapboxgl.accessToken = mapToken;

// Get coordinates from the data attribute in EJS
const mapData = document.getElementById("map-data");
const coordinates = JSON.parse(mapData.dataset.coordinates);

console.log("Coordinates received:", coordinates); // Debugging

// Initialize Mapbox
const map = new mapboxgl.Map({
    container: 'map', // Ensure this ID exists in your EJS file
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: coordinates, // Use dynamic coordinates
    zoom: 8 // Adjust zoom level
});

// Add a marker at the listing location
new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML("<h4>Exact Location Will Seen After Booking</h4>"))
    .addTo(map);
