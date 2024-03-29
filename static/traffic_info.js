$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.42713, lng: 26.1024375 }
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('traffic_info'), {
      zoom: 12,
      center: centerBucharest
  });

  displayMarkers();

  // Create a custom control div to hold the buttons
  var customControlDiv = document.createElement('div');

  // Create a button for recenter the map to Bucharest
  var recenterButton = document.createElement('button');
  recenterButton.textContent = 'Recenter Map';
  recenterButton.classList.add('recenter-button'); // CSS

  // Add click event listener for the recenter button
  recenterButton.addEventListener('click', function() {
    map.setCenter(centerBucharest);
  });

  // Append the recenter button to the custom control div
  customControlDiv.appendChild(recenterButton);

  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
}

function displayMarkers() {
  // Iterate over the markers array
  markers.forEach((markerData, index) => {
    // Create a new InfoWindow instance for each marker
    const infoWindow = new google.maps.InfoWindow({
        content: markerData.content,
        ariaLabel: markerData.ariaLabel,
    });
    
    // Create a marker and attach the info window to it
    const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        title: markerData.title,
    });

    // Add a click event listener to the marker
    marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
    });
  });
}

