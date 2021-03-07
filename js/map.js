var pos;
var map;
var infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.072687, lng: -118.214563},
    zoom: 18
  });
  infoWindow = new google.maps.InfoWindow;

  getUserLocation(map);

  addMapMarkers(dbMarkers);
}

function getUserLocation(gMap){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        //34.0002065,-117.5783486
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location.');
      infoWindow.open(gMap);
      gMap.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, gMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, gMap.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed. Make sure you allow geolocation' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(gMap);
  }
}

var modal = document.getElementById('myModal');
var butttons = document.getElementsByClassName('modalBtn');


modal.style.display = "block";
modal.style.backgroundColor = "#ff000080";
spotContent.style.display = "none";
pointsContent.style.display = "none";
aboutContent.style.display = "none";
aboutContent2.style.display = "block";


for(var i=0; i<butttons.length; i++){
  butttons[i].onclick = function(){
    showModal(this);
  }
}
var navBtns = document.getElementsByClassName('modalBtn');

function showModal(event){
  modal.style.backgroundColor = "#00000066";//---------

  modal.style.display = "block";
  var id = event.id;
  console.log("on."+id);
  if(id === 'spotModalBtn'){
    pointsContent.style.display = "none";
    aboutContent.style.display = "none";
    aboutContent2.style.display = "none";//---------
    spotContent.style.display = "block";
    initMiniMap();
  }else if(id === 'rankModalBtn'){
    spotContent.style.display = "none";
    aboutContent.style.display = "none";
    aboutContent2.style.display = "none";//---------
    pointsContent.style.display = "block";
    showUsers();
  }else if(id === 'aboutModalBtn'){
    spotContent.style.display = "none";
    pointsContent.style.display = "none";
    aboutContent2.style.display = "none";//---------
    aboutContent.style.display = "block";
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  console.log("span click");
  modal.style.display = "none";
  spotContent.style.display = "none";
  pointsContent.style.display = "none";
  aboutContent.style.display = "none";
}


function initMiniMap(){
  var miniMap = new google.maps.Map(document.getElementById('miniMap'), {
    center: pos,
    zoom: 18
  });

  //getUserLocation(miniMap);

  var circle = new google.maps.Circle({
    map: miniMap,
    center: pos,
    radius: 25,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  });
  circle.setOptions({clickable:false});
  var marker = new google.maps.Marker({
      map: miniMap
  });
  google.maps.event.addListener(miniMap, 'click', function(event){
    console.log("ClickPos: ");
    console.log(event.latLng.toJSON());
    if(google.maps.geometry.spherical.computeDistanceBetween(event.latLng, circle.getCenter()) <= 25){
      marker.setPosition(event.latLng);
      document.getElementById('locLat').value = marker.getPosition().lat();
      document.getElementById('locLng').value = marker.getPosition().lng(); 
      console.log("MarkerPos: \n"+marker.getPosition().lat() + ", " + marker.getPosition().lng());  
    }else{
      alert("Place marker within radius.");
    }
  });
}