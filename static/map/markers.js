function createIcon(elementId) {
    var icon = {
        url: document.getElementById(elementId).src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    return icon;
}


function colorString(color, mark, string) {
    return "<strong style='color: " + color + ";'>" + mark + " " + string + "</strong><br>"
}


// Traffic Info Map:
function createContentTrafficInfo(markerData) {
    var content =
      "<div>" +
      "<strong>Geolocation:</strong> [" + markerData.lat + ", " + markerData.lng + "]<br>" +
      "<strong>Zone:</strong> " + markerData.zone + "<br>" +
      "<strong>Density:</strong> " + markerData.density + "<br>" +
      "<strong>Speed:</strong> " + markerData.med_speed + "<br><br>";

      content = content + appendString(markerData.lights, "Traffic Lights");
      content = content + appendString(markerData.cameras, "Traffic Cameras");
      content = content + appendString(markerData.signs, "Traffic Signs");
      content = content + appendString(markerData.incidents, "Traffic Incidents");
      content = content + appendString(markerData.accidents, "Traffic Accidents");
      content = content + endString(markerData.incidents, markerData.accidents, markerData.alert_content);
    
    return content;
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


// Traffic Lights Map:
function createContentTrafficLight(markerData) {
    var content =
      "<div>" +
      "<strong>Geolocation:</strong> [" + markerData.lat + ", " + markerData.lng + "]<br>" +
      "<strong>Zone:</strong> " + markerData.zone + "<br>" +
      "<strong>Orientation - </strong> " + markerData.orientation + "<br>" + "<strong>Function State - </strong>" + appendFunctionState(markerData.functioning, markerData.function_error) + "<strong>Program State - </strong>" + appendProgramState(markerData.program) + "<strong>Red - </strong>" + markerData.time.red + " s<br>" + "<strong>Yellow - </strong>" + markerData.time.yellow + " s<br>" + "<strong>Green - </strong>" + markerData.time.green + " s<br>" + appendError(markerData.error);
    
    return content;
}

function appendFunctionState(condition, string) {
    if (condition === false)
        return colorString("red", "", string);
    
    return colorString("green", "", "Normal");
}

function appendProgramState(string) {
    if (string === "AUTO")
        return colorString("green", "", string);
    
    return colorString("orange", "", string);
}

function appendError(string) {
    if (string != "")
        return colorString("red", "Error - ", string) + "</div>";
    
    return "</div>";
}


// Generate Alerts Map
function createContentGenerateAlerts(markerData) {
    return markerData.content;
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
