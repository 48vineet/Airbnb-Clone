mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Add this line for a valid map style
    center: [74.4611, 20.5351], // Starting position [lng, lat]
    zoom: 9 // Starting zoom
});

console.log("Coordinates from EJS:", coordinates);


const marker1 = new mapboxgl.Marker()
    .setLngLat(coordinates) //Listing.geometry.coordinates
    .addTo(map);