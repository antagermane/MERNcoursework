mapboxgl.accessToken = 'pk.eyJ1IjoiYWdlcm1hIiwiYSI6ImNrcWw2bnpiMDBvMWcycXBodTZ3eHR6YmUifQ.aLdsDR_7XWtpqyy7FcSydQ';
var map = new mapboxgl.Map({
  // Creates map
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12
});

const busLocations = [];

async function run(){
  // Gets live bus data    
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);
  for (let i=0; i<locations.length; i++){
    busLocations[i] = {
    "latitude": locations[i].attributes.latitude,
    "longitude": locations[i].attributes.longitude
  }}
  console.log(locations[0].attributes.latitude)
  console.log(locations[0].attributes.longitude)

  //for (let i=0; i<locations.length; i++){
    // Updates bus array with current bus coordinates
 // busLocations[i] = [
 //   locations[i].attributes.longitude,
 //   locations[i].attributes.latitude
 // ]}
  // Timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
  }


var geojson = {
  type: 'FeatureCollection',
  features: []
};

updateGeojson();

//updates geojson
async function updateGeojson(){
  const start = await run();
  console.log('it called');
  for (let j = 0; j < busLocations.length; j++){
    console.log(j);
    geojson.features.push(
      {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: busLocations[j]
      }
    },
    )};
}

function placeMarkers(){
  // add markers to map
  geojson.features.forEach(function(marker) {

      // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

      // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    });
  };
  
    

  run()
  placeMarkers()

