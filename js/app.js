// La funcionalidad de tu proyecto
var map;
var directionsService;
var marker;
var marker2;
function initMap() {
  directionsService = new google.maps.DirectionsService();
  marker = new google.maps.Marker();
  marker2 = new google.maps.Marker();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  map.addListener('click',function(e){fx(e.latLng)});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      marker.setMap(null);

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var request = {
          origin:pos,
          destination:pos,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        console.log(response)
        if (status == google.maps.DirectionsStatus.OK) {
          var point=response.routes[0].legs[0];
          marker.setOptions({map:map,position:point.start_location});
          map.setCenter(point.start_location);
          $("#start").val(response.routes[0].summary);
          // alert(response.routes[0].summary+'\n'+point.start_location.toString());

        }
      });
      

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Se encuentra aquí.');
      // map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


function fx(latLng) {
  marker2.setMap(null);

  var request = {
      origin:latLng,
      destination:latLng,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
  console.log(response)
    if (status == google.maps.DirectionsStatus.OK) {
      var point=response.routes[0].legs[0];
      marker2.setOptions({map:map,position:point.start_location});
      map.setCenter(point.start_location);
      $("#destiny").val(response.routes[0].summary);
      // alert(response.routes[0].summary+'\n'+point.start_location.toString());

    }
  });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}