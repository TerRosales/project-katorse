function initMap() {
    var location = {
        lat: 41.113770,
        lng: -85.151770,
    }
    var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: location
    }); 
}