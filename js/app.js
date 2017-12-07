 $(document).ready(function () {
            initMap('Madrid', 'Barcelona', 'map_canvas')
        });

        /* recoger el valor de un elemento */
        function getElementValue(elemId) {
            try {
                return document.getElementById(elemId).value;
            } catch (e) {
                return;
            }
        }

var directionsDisplay = null;
var directionsService = null;
var map = null
var request = {
        origin: [document.getElementById('origen')],
        destination: [document.getElementById('destino')],
        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false
    };

    console.log(request);
    // Call to google maps for search a route from 2 points
var o = document.getElementById('origen').value();
var d = document.getElementById('destino').value();
var s = document.getElementById('buscar').value();
function initMap(o, d, s) {
    var request = {
        origin: o,
        destination: d,
        travelMode: google.maps.DirectionsTravelMode['DRIVING'],
        unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false
    };

    map = new google.maps.Map($('#' + s).get(0));
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else {
            document.getElementById(s).innerHTML = "<p style='text-align: center;'>Address not found</p>";      //delete content
        }
    });
}

