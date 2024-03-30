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
      "<strong>Speed:</strong> " + markerData.med_speed + "<br><br>";

    contentString = contentString + appendString(markerData.lights, "Traffic Lights");
    contentString = contentString + appendString(markerData.cameras, "Traffic Cameras");
    contentString = contentString + appendString(markerData.signs, "Traffic Signs");
    contentString = contentString + appendString(markerData.incidents, "Traffic Incidents");
    contentString = contentString + appendString(markerData.accidents, "Traffic Accidents");
    contentString = contentString + endString(markerData.incidents, markerData.accidents, markerData.alert_content);
    
    return contentString;
}

function colorString(color, mark, string) {
    return "<strong style='color: " + color + ";'>" + mark + " " + string + "</strong><br>"
}

function appendString(condition, string) {
    if (condition === true)
        return colorString("red", "❌", string);
    
    return colorString("green", "✔", string);
}

function endString(incidents, accidents, string) {
    if (accidents === false)
        if (incidents === false)
            return "<br>" + colorString("green", "", "No Alerts") + "</div>";
        else
            return "<br>" + colorString("orange", "", "Reported Incident: ") + colorString("black", "", string) + "</div>";
    else
        return "<br>" + colorString("red", "", "Reported Incident: ") + colorString("black", "", string) + "</div>";
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
