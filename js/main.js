// Initialize the map
function initMap() {
  // Define the coordinates for the map center
  const coordinates = { lat: 41.113770, lng: -85.151772 };

  // Create a new Google Map with specific options
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,           // Set the initial zoom level
    center: coordinates, // Set the map center to the defined coordinates
  });

  // Create a default marker for the map at the specified coordinates
  const marker = new google.maps.Marker({
    position: coordinates, // Set marker's position
    map: map,             // Assign the marker to the map
  });

  // Initialize a variable to track the currently open info window
  let openInfoWindow = null;

  // Create a Google Places Service using the map
  const service = new google.maps.places.PlacesService(map);

  // Define a request for nearby places search
  const request = {
    location: coordinates,      // Search around the specified coordinates
    radius: 12000,              // Search radius (in meters)
    type: ["restaurant", "gas_station", "lodging"], // Types of places to search for
  };

  // Perform a nearby places search and create markers for the results
  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });

  // Function to create a marker for a specific place
  function createMarker(place) {
    // Create a marker for the place with specific properties
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
      icon: {
        // Customize the marker icon
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "rgba(255, 0, 255, 0.8)",
        fillOpacity: 1,
        strokeColor: "rgba(0, 0, 200, 0.5)",
        strokeOpacity: 1,
        scale: 8,
      },
    });

    // Create an info window for the place with a maximum width
    const infowindow = new google.maps.InfoWindow({
      maxWidth: "20rem",
    });

    // Add a click event listener to the marker
    google.maps.event.addListener(marker, "click", function () {
      if (openInfoWindow) {
        openInfoWindow.close();
      }

      // Request additional details for the place
      const detailsRequest = {
        placeId: place.place_id,
        fields: ["name", "formatted_phone_number", "rating", "photos"],
      };

      // Create a Google Places Service for details
      const detailsService = new google.maps.places.PlacesService(map);

      // Retrieve place details and display them in an info window
      detailsService.getDetails(detailsRequest, function (placeDetails, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Prepare content to display in the info window
          const content = `
            <h4>${placeDetails.name}</h4>
            <p>Rating: ${placeDetails.rating}</p>
            <p>Phone: ${placeDetails.formatted_phone_number}</p>
            <img src="${placeDetails.photos[0].getUrl()}" alt="Place Photo" width="200" height="200">
          `;

          // Set the info window's content, open it on the map, and update the openInfoWindow
          infowindow.setContent(content);
          infowindow.open(map, marker);
          openInfoWindow = infowindow;
        }
      });
    });
  }
}
