var map
var points = []

//script to display the map
function initMap() {
	$.get("/getdots", function(data, status){
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat:52.373801, lng: 4.890935},
			zoom: 	13
		})

		var locations = [
		{title: 'Grijze bank', 	location: {lat: 52.379189, lng: 4.899431 }, picture: '0cdce8b6a0f08839f379bced61162dae' },
		{title: 'Knuffel', 		location: {lat: 52.395728 , lng: 4.966210}, picture: '8aa8259065d812a3ef2a40baddce5478' }]


		var largeInfowindow = new google.maps.InfoWindow()

		var marker, i 

		for (var j = 0; j < data.length; j++) {
			console.log ('dit is data' + data)
			locations.push( {title: data[j].title, location: {lat: data[j].latitude , lng: data[j].longitude }, picture: data[j].picture})
			
			var bounds = new google.maps.LatLngBounds()
		}

		console.log ('dit is locations' + locations)
		//use the location array to create an array of markers
		for (var i = 0; i < locations.length; i++) {
			//get position from the location array
			var position 	= locations[i].location
			var title 		= locations[i].title
			//create a marker per location and put into marker array
			marker = new google.maps.Marker({
				map: 		map, 
				position: 	position, 
				title: 		title,
				animation: 	google.maps.Animation.DROP,
				id: 		i
			})
		
			//extend the boundaries of the map for each marker
			bounds.extend(marker.position)

			console.log(marker)

			//create an onclick event to open an infowindow at each marker
			marker.addListener('click', (function( marker, i) {
				return function () {

					if (largeInfowindow.marker != marker) {
						largeInfowindow.marker = marker
						largeInfowindow.setContent ('<a href="/wittebank"><IMG  BORDER="0" ALIGN="Left" SRC="/../uploads/'+ locations[i].picture +'"> </a> <div ALIGN="center">'+ marker.title + '</div>')
						largeInfowindow.open (map,marker)
						// // Make sure the marker property  is cleared if the window is closed
						// largeInfowindow.addListener('closeclick', function(){	
						// })
					}
				}
			})(marker, i))
		}

		map.fitBounds(bounds)
		//this function populates the infowindow when the marker is clicked. Only o
		//only one infowindow is allowed to be open
		
	})
}


//send the geolocation to the form
$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(function(position){
		$('#sendLong').val(position.coords.longitude)
		$('#sendLat').val(position.coords.latitude)
	})
})
