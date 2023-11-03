// function initMap() {
            
//     const coordinates = { lat: 40.689, lng: -74.044 };

//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 13,
//         center: coordinates,
//     });

//     const marker = new google.maps.Marker({
//         position: coordinates,
//         map: map,
//     });
    

//     const circle = new google.maps.Circle({
//         strokeColor: "blue",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "lightseagreen",
//         fillOpacity: 0.5,
//         map,
//         center: coordinates,
//         radius: 600,
//         });
    
//     const rectangle = new google.maps.Rectangle({
//         strokeColor: "maroon",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "coral",
//         fillOpacity: 0.1,
//         map,
//         bounds: {
//             north: 40.699, // Adjust the latitude values to fit your desired bounds
//             south: 40.679,
//             east: -74.024, // Adjust the longitude values to fit your desired bounds
//             west: -74.064
//         }
//     });
    
    
// };

// var map;
// var service;
// var infowindow;

// function initMap() {
//   var sydney = new google.maps.LatLng(-33.867, 151.195);

//   infowindow = new google.maps.InfoWindow();

//   map = new google.maps.Map(
//       document.getElementById('map'), {center: sydney, zoom: 15});

//   var request = {
//     query: 'Museum of Contemporary Art Australia',
//     fields: ['name', 'geometry'],
//   };

//   var service = new google.maps.places.PlacesService(map);

//   service.findPlaceFromQuery(request, function(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//       map.setCenter(results[0].geometry.location);
//     }
//   });
// }


var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'Museum of Contemporary Art Australia',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
