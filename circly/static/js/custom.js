// Require our modules
const db 		= 	require(__dirname + '../../modules/database')
const Sequelize = 	require ('sequelize')
const express 	= 	require('express')
var map
var markers = []

//script to display the map
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:52.373801, lng: 4.890935},
		zoom: 13
	})
	//getting the information out of the library
	db.Bulk.findAll().then( bulk => { 
			bbulk = []
			for (var i = 0; i < posts.length; i++) {
				bbulk.push( bulk[i].dataValues)
				console.log ('This is how it looks :' + bulk[i].dataValues)
			}
		})

	var locations = [
	{title: 'Bijlmer' , 	location: {lat: 52.3195108 , lng: 4.9660694 }},
	{title: 'Centraal', 	location: {lat: 52.379189, lng: 4.899431 }},
	{title: 'Noord', 		location: {lat: 52.395728 , lng: 4.966210}}
	]

	var largeInfowindow = new google.maps.InfoWindow()
	var bounds = new google.maps.LatLngBounds()

	//use the location array to create an array of markers
	for (var i = 0; i < locations.length; i++) {
		//get position from the location array
		var position = locations[i].location
		var title = locations[i].title
		//create a marker per location and put into marker array
		var marker = new google.maps.Marker({
			map: map, 
			position: position, 
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
		})
		//push marker to our array of markers
		markers.push(marker)
		//extend the boundaries of the map for each marker
		bounds.extend(marker.position)
		//create an onclick event to open an infowindow at each marker
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow)
		})
	}
	map.fitBounds(bounds)
	//this function populates the infowindow when the marker is clicked. Only o
	//only one infowindow is allowed to be open
	function populateInfoWindow (marker, infowindow) {
		//check to make sure the infowindow is not already opened on this marker
		if (infowindow.marker != marker) {
			infowindow.marker = marker
			infowindow.setContent ('</div>' + marker.title + '</div>')
			infowindow.open (map,marker)
			// Make sure the marker property  is cleared if the window is closed
			infowindow.addListener('closeclick', function(){
				infowindow.setMarker(null)
			})
		}
	}

}



//Get geolocation script
var x = document.getElementById("demo");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = position.coords.latitude + position.coords.longitude;
}



//send the geolocation to the form
$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(function(position){
		$('#sendLong').val(position.coords.longitude)
		$('#sendLat').val(position.coords.latitude)
	})
})






