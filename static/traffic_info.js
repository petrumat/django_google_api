$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.4268, lng: 26.10246 }
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('traffic_info'), {
      zoom: 12,
      center: centerBucharest
  });

  displayMarkers();

  createButtons();
}

function displayMarkers() {
  // Generate traffic info icons
  const trafficInfoGoodIcon = createTrafficInfoGoodIcon();
  const trafficInfoBadIcon = createTrafficInfoBadIcon();

  // Iterate over the markers array
  markers.forEach((markerData, index) => {
    // Determine icon style
    switch(markerData.icon) {
      case "good":
        markerIcon = trafficInfoGoodIcon
        break;
      case "bad":
        markerIcon = trafficInfoBadIcon
        break;
      default:
        console.log('Unknown icon in traffic_info.js');
    }

    // Create a new InfoWindow instance for each marker
    const infoWindow = new google.maps.InfoWindow({
        content: markerData.content,
        ariaLabel: markerData.ariaLabel,
    });
    
    // Create a marker and attach the info window to it
    const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        icon: markerIcon,
        // label: index.toString(),
        title: markerData.title,
        // animation: google.maps.Animation.BOUNCE,
    });

    // Add a click event listener to the marker
    marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
    });
  });
}

function createButtons() {
  // Create a custom control div to hold the buttons
  var customControlDiv = document.createElement('div');

  // Create a button for recenter the map to Bucharest
  var recenterButton = createRecenterButton();

  // Append the recenter button to the custom control div
  customControlDiv.appendChild(recenterButton);

  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
}