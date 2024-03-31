function createIcon(elementId) {
    var icon = {
        url: document.getElementById(elementId).src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    return icon;
}



// General functions for building content strings
function appendGeolocation(lat, lng) {
    return "<strong>Geolocation:</strong> [" + lat + ", " + lng + "]<br>";
}

function appendString(tag, value) {
    return "<strong>" + tag + "</strong> " + value + "<br>";
}

function colorString(color, mark, string) {
    return "<strong style='color: " + color + ";'>" + mark + " " + string + "</strong><br>"
}



// Traffic Info Map:
function createContentTrafficInfo(markerData) {
    var content = "<div>" +
        appendGeolocation(markerData.lat, markerData.lng) +
        appendString("Zone:", markerData.zone) +
        appendString("Density:", markerData.density) +
        appendString("Speed:", markerData.med_speed) + "<br>" +
        appendStringCondition(markerData.lights, "Traffic Lights") +
        appendStringCondition(markerData.cameras, "Traffic Cameras") +
        appendStringCondition(markerData.signs, "Traffic Signs") +
        appendStringCondition(markerData.incidents, "Traffic Incidents") +
        appendStringCondition(markerData.accidents, "Traffic Accidents") +
        appendIncidents(markerData.incidents, markerData.accidents, markerData.alert_content) +
        "</div>";
    
    return content;
}

function appendStringCondition(condition, string) {
    if (condition === true)
        return colorString("red", "❌", string);
    
    return colorString("green", "✔", string);
}

function appendIncidents(incidents, accidents, string) {
    if (accidents === false)
        if (incidents === false)
            return "<br>" + colorString("green", "", "No Alerts");
        else
            return "<br>" + colorString("orange", "", "Reported Incident: ") + colorString("black", "", string);
    else
        return "<br>" + colorString("red", "", "Reported Incident: ") + colorString("black", "", string);
}



// Traffic Lights Map:
function createContentTrafficLight(markerData) {
    var content = "<div>" +
        appendGeolocation(markerData.lat, markerData.lng) +
        appendString("Zone:", markerData.zone) +
        appendString("Orientation -", markerData.orientation) +
        appendFunctionState(markerData.functioning, markerData.function_error) +
        appendProgramState(markerData.program) +
        appendColorTime("Red", markerData.time.yellow) +
        appendColorTime("Yellow", markerData.time.yellow) +
        appendColorTime("Green", markerData.time.green) +
        appendError(markerData.error) +
        "</div>";
    
    return content;
}

function appendFunctionState(condition, string) {
    result = "<strong>Function State - </strong>";
    
    if (condition === false)
        return result + colorString("red", "", string);
    
    return result + colorString("green", "", "Normal");
}

function appendProgramState(string) {
    result = "<strong>Program State - </strong>";

    if (string === "AUTO")
        return result + colorString("green", "", string);
    
    return result + colorString("orange", "", string);
}

function appendColorTime(color, time) {
    return "<strong>" + color + " - </strong>" + time + " s<br>";
}

function appendError(string) {
    if (string != "")
        return colorString("red", "Error - ", string);
    
    return "";
}



// Generate Alerts Map
function createContentGenerateAlerts(markerData) {
    var content = appendGeolocation(markerData.lat, markerData.lng) +
        appendString("Zone:", markerData.zone) +
        appendString("Recommended Speed:", markerData.speed) +
        colorString("orange", "", markerData.alert) +
        "</div>";

    return content;
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
