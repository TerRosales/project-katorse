

function initMap() {
  const coordinates = { lat: 41.113770, lng: -85.151772 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: coordinates,
  });

  // Create a default marker for your coordinates
  const marker = new google.maps.Marker({
    position: coordinates,
    map: map, // Assign the map
  });

  let openInfoWindow = null;

  const service = new google.maps.places.PlacesService(map);

  const request = {
    location: coordinates,
    radius: 12000,
    type: ["restaurant", "gas_station", "lodging"],
  };

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });

  function createMarker(place) {
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "rgba(255, 0, 255, 0.8)",
        fillOpacity: 1,
        strokeColor: "rgba(0, 0, 200, 0.5)",
        strokeOpacity: 1,
        scale: 8,
      },
    });

    const infowindow = new google.maps.InfoWindow({
      maxWidth: "20rem",
    });

    google.maps.event.addListener(marker, "click", function () {
      if (openInfoWindow) {
        openInfoWindow.close();
      }

      const detailsRequest = {
        placeId: place.place_id,
        fields: ["name", "formatted_phone_number", "rating", "photos"],
      };

      const detailsService = new google.maps.places.PlacesService(map);

      detailsService.getDetails(detailsRequest, function (placeDetails, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const content = `
            <h4>${placeDetails.name}</h4>
            <p>Rating: ${placeDetails.rating}</p>
            <p>Phone: ${placeDetails.formatted_phone_number}</p>
            <img src="${placeDetails.photos[0].getUrl()}" alt="Place Photo" width="200" height="200">
          `;

          infowindow.setContent(content);
          infowindow.open(map, marker);
          openInfoWindow = infowindow;
        }
      });
    });
  }
}

