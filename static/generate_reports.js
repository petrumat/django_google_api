$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});

const centerBucharest = { lat: 44.4268, lng: 26.10246 }
let map;
let searchBox;
let icon;
let trafficLayer;
let infoWindows = [];
let mapMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('generate_reports'), {
      zoom: 12,
      center: centerBucharest
  });

  createLabel('Generate Reports Map');

  createSearchBox();

  icon = createIcon('hiddenGenerateReportIcon');

  trafficLayer = new google.maps.TrafficLayer();
  createButtons();

  setInterval(displayMarkers, 1000); // 1000 milliseconds
}

async function fetchMarkerData() {
  try {
    const response = await fetch('/generateReportsData');
    return await response.json();
  } catch (error) {
    console.error('Error fetching marker generateReportsData:', error);
    return [];
  }
}

async function displayMarkers() {
  // Fetch marker data from Django backend
  const markers = await fetchMarkerData();

  // Iterate over the markers array
  markers.forEach((markerData, index) => {
    const existingMarker = mapMarkers.find(marker => marker.id === markerData.id);

    // If an existing marker is found and its data has changed, update it
    if (existingMarker && existingMarker.dataChanged(markerData)) {
        existingMarker.infoWindow.setContent(createContentGenerateReports(markerData));
        existingMarker.data = markerData;
    } else {
        // Build the marker content
        const contentString = createContentGenerateReports(markerData);

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
            title: markerData.title,
        });

        // Add a click event listener to the marker
        marker.addListener("click", () => {
          infoWindow.open({ anchor: marker, map });
        });

        // Add the marker to the array of marker objects
        mapMarkers.push({
            id: markerData.id,
            marker,
            infoWindow,
            data: markerData,
            dataChanged(newData) {
                // Check if any property of the marker's data has changed
                return JSON.stringify(this.data) !== JSON.stringify(newData);
            }
        });
    }
  });
}

function createButtons() {
  // Create a custom control div to hold the buttons
  var customControlDiv = document.createElement('div');

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