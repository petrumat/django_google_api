function createIcon(elementId) {
    var icon = {
        url: document.getElementById(elementId).src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    return icon;
}

function createContentTrafficInfo(markerData) {
    var contentString =
      "<div>" +
      "<strong>Geolocation:</strong> [" + markerData.lat + ", " + markerData.lng + "]<br>" +
      "<strong>Zone:</strong> " + markerData.zone + "<br>" +
      "<strong>Density:</strong> " + markerData.density + "<br>" +
      "<strong>Speed:</strong> " + markerData.med_speed + "<br>" +
      "<strong>Lights:</strong> " + markerData.lights + "<br>" +
      "<strong>Cameras:</strong> " + markerData.cameras + "<br>" +
      "<strong>Signs:</strong> " + markerData.signs + "<br>" +
      "<strong>Incidents:</strong> " + markerData.incidents + "<br>" +
      "<strong>Accidents:</strong> " + markerData.accidents + "<br>" +
      "<strong>Alerts:</strong> " + markerData.alerts;

    if (markerData.alerts === false) {
      contentString = contentString + "</div>";
    } else {
      contentString = contentString + "<br>" +
      "<strong>Reported Incident:</strong> " + markerData.alert_content + "</div>";
    }

    return contentString;
}


// function createTrafficInfoGoodIcon() {
//     var trafficInfoGoodIcon = {
//         url: document.getElementById('hiddenTrafficInfoGoodIcon').src,
//         scaledSize: new google.maps.Size(50, 50),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(25, 50)
//     };

//     return trafficInfoGoodIcon;
// }

// function createTrafficInfoBadIcon() {
//     var trafficInfoBadIcon = {
//         url: document.getElementById('hiddenTrafficInfoBadIcon').src,
//         scaledSize: new google.maps.Size(50, 50),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(25, 50)
//     };
    
//     return trafficInfoBadIcon;
// }

function createGenerateAlertIcon() {
    var generateAlertIcon = {
        url: document.getElementById('hiddenGenerateAlertIcon').src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };
    
    return generateAlertIcon;
}

function createTrafficLightIcon() {
    var trafficLightIcon = {
        url: document.getElementById('hiddenTrafficLightIcon').src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };
    
    return trafficLightIcon;
}

function createGenerateReportIcon() {
    var generateReportIcon = {
        url: document.getElementById('hiddenGenerateReportIcon').src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    return generateReportIcon;
}
