$(".hover").click(function() {
  $(".hover").removeClass("active");
  $(this).toggleClass("active");
});

var map;
var infowindow;

function initMap() {
  var pyrmont = {
    lat: 55.604842,
    lng: 13.002749
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 1000,
    type: ['bar']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      // console.log(results[i]);
      console.log(results[i].name);
      var nameOfPlace = results[i].name;
      $("#demo").append("<li>" + nameOfPlace + "</li>");
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
