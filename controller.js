$(document).ready(function(){
	$("#searchRoute").click(function(){
		$.get('https://kyoto-map-20.herokuapp.com/',function(data,status){
			alert(data)
		});
	});

	 $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');        
	});

});

function initMap() {
    const garden = { lat: 35.023138536118545, lng: 135.76386160876868 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: garden,
    });
    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Kyoto Botanical Garden</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Kyoto Botanical Garden</b>, Founded in 1924, Kyoto Botanical Gardens is the oldest and most comprehensive public botanical garden in Japan.</b> " +
      "With seasonal plants and various conservatories, the Gardens is ever-changing and can be enjoyed all year round</b> " +
      "More than 450 cherry blossom trees bloom beautifully in spring and leaves of deciduous trees such as maple color exquisitely in autumn. " +
      "At other times of the year, lush greenery and a wide variety of trees and flowers can be enjoyed" +
      "Kyoto Botanical Gardens is a living museum of plants that offers opportunities for both education and relaxation. " +
      "Total area: approximately 240,000 ㎡ " +
      "Collection: approximately 12,000 taxa " +
      '<p>Attribution: Kyoto Botanical Garden, <a href="http://www.pref.kyoto.jp/en/02-02-10.html">' +
      "http://www.pref.kyoto.jp/en/02-02-10.html</a> " +
      "</div>" +
      "</div>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    const marker = new google.maps.Marker({
      position: garden,
      map,
      title: "Kyoto Botanical Garden",
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }

