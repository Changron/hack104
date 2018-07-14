var map;
var infowindow;
var home;
var company;

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var geocoder = new google.maps.Geocoder();
  
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 24.795154, lng: 120.993898}
  });
  directionsDisplay.setMap(map);
  
  home = document.getElementById('home').innerHTML;
  //company = '300台灣新竹市東區光復路二段101號';
  company = document.getElementById('company').innerHTML;
  
  calculateAndDisplayRoute(directionsService, directionsDisplay);
  markCoffeeShopNearCompany(geocoder, company);
  //map.setZoom(15);
}

function markLocation(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    //icon: '{% static "maps/coffee-cup.png" %}',
    //icon: '/static/media/coffee-cup.png',
    icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|D85140',
    title: 'Cafe',
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(infowindowContent(place));
    infowindow.open(map, this);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: home,
    destination: company,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      //directionsDisplay.setOptions({ preserveViewport: true });
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function infowindowContent(place) {
  return '<a href="https://google.com">'+place.name+'</a>'+ratingToRatingStar(place.rating);
}

function ratingToRatingStar(rating) {
  var ratingStar = '<br>'+rating +' ';
  for (i = 1; i <= 5; i++) { 
      if(rating-i >= 0){
        ratingStar += '<span class="fa fa-star checked"></span>';
      }
      else if (i-rating < 1){
        ratingStar += '<span class="fa fa-star-half-o checked"></span>';
      }
      else{
        ratingStar += '<span class="fa fa-star-o checked"></span>';
      }
  }
  return ratingStar;
}

function geocodeAddress(geocoder, address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      console.log(results[0].geometry.location.lat);
      return results[0].geometry.location;
    } else {
      console.log('not ok');
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function  markCoffeeShopNearCompany(geocoder, address){
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      var request = {
        location: results[0].geometry.location,
        radius: '1000',
        type: ['cafe']
      };
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, markLocation);
    } else {
      console.log('not ok');
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}