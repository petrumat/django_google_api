$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.4268, lng: 26.10246 }
let map;
let circles = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('generate_alerts'), {
      zoom: 12,
      center: centerBucharest
  });

  displayMarkers();

  createButtons();
}

function displayMarkers() {
  // Generate alert icon
  const generateAlertIcon = createIcon('hiddenGenerateAlertIcon');

  // Iterate over the markers array
  markers.forEach((markerData, index) => {

    // Build the marker content
    var contentString = createContentGenerateAlerts(markerData);

    // Create a new InfoWindow instance for each marker
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: markerData.ariaLabel,
    });
    
    // Create a marker and attach the info window to it
    const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map,
        icon: generateAlertIcon,
        // label: index.toString(),
        title: markerData.title,
        // animation: google.maps.Animation.BOUNCE,
    });

    // Define the circle options
    var circleOptions = {
      strokeColor: "#FFCC33", // Color of the circle border
      strokeOpacity: 1,     // Opacity of the circle border [0.0 -> 1]
      strokeWeight: 3,        // Thickness of the circle border
      fillColor: "yellow",   // Color of the circle fill
      fillOpacity: 0.0,      // Opacity of the circle fill
      map: map,
      center: { lat: markerData.lat, lng: markerData.lng },
      radius: 1500           // Radius of the circle in meters
    };

    // Append the circle
    const circle = new google.maps.Circle(circleOptions)
    circles.push(circle);

    // Add a click event listener to the marker
    marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
    });
  });
}

function createButtons() {
  // Create a custom control div to hold the buttons
  var customControlDiv = document.createElement('div');

  // Create a button for toggling circle visibility on map
  var toggleCirclesVisibilityButton = createToggleCirclesVisibilityButton();

  // Append the recenter button to the custom control div
  customControlDiv.appendChild(toggleCirclesVisibilityButton);

  // Create a button for recenter the map to Bucharest
  var recenterButton = createRecenterButton();

  // Append the recenter button to the custom control div
  customControlDiv.appendChild(recenterButton);

  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
}