$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});


function initMap() {
  var map = new google.maps.Map(document.getElementById('traffic_info'), {
      zoom: 7,
      center: { lat: 44.42713, lng: 26.1024375 }
  });

  displayMarker(map);

}


function displayMarker(map) {
  // Create a new InfoWindow instance
  const infoWindow = new google.maps.InfoWindow({
      content: "Hello, World! From pop-up",
      ariaLabel: "Hi",
  });
  // Create a marker and attach the info window to it
  const marker = new google.maps.Marker({
      position: { lat: 46.0000000, lng: 26.0000000 },
      map,
      title: "I'm here",
  });

  // Add a click event listener to the marker
  marker.addListener("click", () => {
      infoWindow.open({ anchor: marker, map, });
  });
}