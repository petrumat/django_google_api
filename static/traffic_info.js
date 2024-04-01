$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.4268, lng: 26.10246 }
let map;
let infoWindows = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('traffic_info'), {
      zoom: 12,
      center: centerBucharest
  });

  createLabel('Traffic Info Map');

  displayMarkers();

  createButtons();
}

function displayMarkers() {
  // Generate traffic info icons
  const trafficInfoGreenIcon = createIcon('hiddenTrafficInfoGreenIcon');
  const trafficInfoRedIcon = createIcon('hiddenTrafficInfoRedIcon');

  // Iterate over the markers array
  markers.forEach((markerData, index) => {
    
    // Determine icon style
    switch(markerData.icon) {
      case "green":
        markerIcon = trafficInfoGreenIcon
        break;
      case "red":
        markerIcon = trafficInfoRedIcon
        break;
      default:
        console.log('Unknown icon in traffic_info.js');
    }

    // Build the marker content
    var contentString = createContentTrafficInfo(markerData);

    // Create a new InfoWindow instance for each marker
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: markerData.ariaLabel,
    });
    infoWindows.push(infoWindow);
    
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

  var closeInfoWindowsButton = createCloseInfoWindowsButton();
  customControlDiv.appendChild(closeInfoWindowsButton);

  var recenterButton = createRecenterButton();
  customControlDiv.appendChild(recenterButton);

  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
}

function createLabel(textContent) {
  // Create a custom control div to hold the buttons
  var customLabelDiv = document.createElement('div');

  var label = createMapLabel(textContent);
  customLabelDiv.appendChild(label);

  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(customLabelDiv);
}