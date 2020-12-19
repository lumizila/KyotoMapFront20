$(document).ready(function(){
	initMap();
	$("#searchRoute").click(function(){
		$.get('https://kyoto-map-20.herokuapp.com/',function(data,status){
			alert(data)
		});
	});

	 $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');        
	});

});

function initMap(){
			var location = {lat: 35.011635, lng: 135.768036};
			var map = new google.maps.Map(document.getElementById("map"), {
				zoom: 4,
				center: location
			});
			var marker = new google.maps.Marker({
				position: location,
				map: map
			});
		}