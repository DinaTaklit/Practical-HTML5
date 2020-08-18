function createDrivingDirectionsMap() {
    if (navigator.geolocation) {
        // Get the current Position if there is support to geolocation
        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 500
        });
    } else {
        document.getElementById(map).innerHTML = "No support for geolocation, we can't find you :(";
    }
};
// Onsuccess get the latitude and longitude
function OnSuccess(position) {
    showMap(
        position.coords.latitude,
        position.coords.longitude
    );
};
// On error show a message according to the occured error
function OnError() {
    var mapDiv = document.getElementById("map");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mapDiv.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            mapDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            mapDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            mapDiv.innerHTML = "An unknown error occurred."
            break;
    }
};

// Show map function
function showMap(lat, lang) {

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    // Add rout to the destination
    var route = {
        origin: new google.maps.LatLng(lat, lang),
        destination: "Grote Markt, Brussel",
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    // Configure the map options
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.8504500, 4.3487800),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Create the google map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("driving-directions"));
    directionsService.route(route, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });
}