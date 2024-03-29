function createTrafficInfoGoodIcon() {
    var trafficInfoGoodIcon = {
        url: document.getElementById('hiddenTrafficInfoGoodIcon').src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    return trafficInfoGoodIcon;
}

function createTrafficInfoBadIcon() {
    var trafficInfoBadIcon = {
        url: document.getElementById('hiddenTrafficInfoBadIcon').src,
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };
    
    return trafficInfoBadIcon;
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
