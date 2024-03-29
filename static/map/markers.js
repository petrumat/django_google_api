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
      "<strong>Speed:</strong> " + markerData.med_speed + "<br>";

    contentString = contentString + "<strong>Lights:</strong> "
    if (markerData.lights === false) {
        contentString = contentString + "✔" + "<br>";
    } else {
        contentString = contentString + "❌" + "<br>";
    }

    contentString = contentString + "<strong>Cameras:</strong> "
    if (markerData.cameras === false) {
        contentString = contentString + "✔" + "<br>";
    } else {
        contentString = contentString + "❌" + "<br>";
    }

    contentString = contentString + "<strong>Signs:</strong> "
    if (markerData.signs === false) {
        contentString = contentString + "✔" + "<br>";
    } else {
        contentString = contentString + "❌" + "<br>";
    }

    contentString = contentString + "<strong>Incidents:</strong> "
    if (markerData.incidents === false) {
        contentString = contentString + "✔" + "<br>";
    } else {
        contentString = contentString + "❌" + "<br>";
    }

    contentString = contentString + "<strong>Accidents:</strong> "
    if (markerData.accidents === false) {
        contentString = contentString + "✔" + "<br>";
    } else {
        contentString = contentString + "❌" + "<br>";
    }

    if (markerData.alerts === false) {
      contentString = contentString + "<br>" + "<strong>No Alerts</strong>" + "</div>";
    } else {
      contentString = contentString + "<br>" +
      "<strong>Reported Incident:</strong> " + markerData.alert_content + "</div>";
    }

    return contentString;
}



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
