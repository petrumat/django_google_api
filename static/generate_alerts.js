$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.4268, lng: 26.10246 }
let map;
let searchBox;
let trafficLayer;
let infoWindows = [];
let circles = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('generate_alerts'), {
      zoom: 12,
      center: centerBucharest
  });

  createLabel('Generate Alerts Map');

  createSearchBox();

  displayMarkers();

  trafficLayer = new google.maps.TrafficLayer();
  createButtons();
}

function displayMarkers() {
  // Generate alert icon
  const icon = createIcon('hiddenGenerateAlertIcon');

  // Iterate over the markers array
  markers.forEach((markerData, index) => {

    // Build the marker content
    var contentString = createContentGenerateAlerts(markerData);

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
        icon: icon,
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

  var toggleAreaVisibilityButton = createToggleAreaVisibilityButton();
  customControlDiv.appendChild(toggleAreaVisibilityButton);

  var closeInfoWindowsButton = createCloseInfoWindowsButton();
  customControlDiv.appendChild(closeInfoWindowsButton);

  var recenterButton = createRecenterButton();
  customControlDiv.appendChild(recenterButton);

  var toggleTrafficLayerButton = createToggleTrafficLayerButton();
  customControlDiv.appendChild(toggleTrafficLayerButton);

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

function createSearchBox() {
  // Create a custom control div to search input
  var customControlDiv = document.createElement('div');

  var searchInput = document.getElementById('search-input');
  searchInput.style.width = '300px';
  customControlDiv.appendChild(searchInput);

  // Add the custom control to the map at top center position
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(customControlDiv);

    searchBox = new google.maps.places.SearchBox(searchInput, {
      componentRestrictions: {'country': [base_country.toLowerCase()]},
    });

  searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
          return;
      }

      // Process the selected place (e.g., center the map)
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
          if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
          }

          // Fit the map to the bounds of the selected place
          bounds.extend(place.geometry.location);
      });

      map.fitBounds(bounds);
      map.setZoom(14);
  });
}