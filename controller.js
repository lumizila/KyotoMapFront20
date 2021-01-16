var ourmap;

$(document).ready(function(){

$("#seeNews").click(function(){
    window.open("https://www.japantimes.co.jp/tag/kyoto/");
});

$("#getRecommendationRoute").click(function(){
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();

       directionsRenderer.setMap(ourmap);    
       var start =  new google.maps.LatLng({lat: 135.771562624224, lng: 35.017155});
       var end = new google.maps.LatLng({lat: 135.748434499307, lng: 35.014023075});
        var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
      };
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
        }
      });

});

$("#chat").click(function(){
    window.open("https://kyoto-map-20.herokuapp.com/chatSystem.png");
});

$("#filterCategory").click(function(){

    hideMarkers();
    var notchecked = true;
    
    if ($('#nature').prop('checked') == true)
    {
        filterMarkers("park");
        filterMarkers("mountain");
        filterMarkers("river");
        filterMarkers("garden");
        notchecked = false;

    }
    if ($('#temples').prop('checked') == true)
    {
        filterMarkers("park");
        filterMarkers("mountain");
        notchecked = false;

    }
    if ($('#shrines').prop('checked') == true)
    {
        filterMarkers("jinja");
        notchecked = false;
    }
    if ($('#castles').prop('checked') == true)
    {
        filterMarkers("castle");
        filterMarkers("palace");
        notchecked = false;

    }
    if ($('#museums').prop('checked') == true)
    {
        filterMarkers("museum");
        notchecked = false;
    }
    if ($('#sightseeing').prop('checked') == true)
    {
       filterMarkers("tower");
       filterMarkers("mountain");
       notchecked = false;
    }
    if ($('#resandbars').prop('checked') == true)
    {
        filterMarkers("restaurant");
        notchecked = false;
    }
    if ($('#hospitals').prop('checked') == true)
    {
        filterMarkers("hospital");
        notchecked = false;
    }
    if ($('#shopping').prop('checked') == true)
    {
        filterMarkers("shop");
        filterMarkers("mall");
        notchecked = false;
    }
    if ($('#stations').prop('checked') == true)
    {
        filterMarkers("station");
        notchecked = false;
    }
    if ($('#others').prop('checked') == true)
    {
        filterMarkers("cemetery");
        notchecked = false;
    }
    //show all markers if no filter was selected
    if(notchecked == true){
        showMarkers();
    }
});

}); 

var gmarkers1 = [];
var infoWindows = [];

function initMap() { //ok
    const garden = { lat: 35.023138536118545, lng: 135.76386160876868 };
    ourmap = new google.maps.Map(document.getElementById("map"), { 
      zoom: 14,
      center: garden,
    });

    ourmap.addListener('click', function() { //ok
        for(var j = 0; j < infoWindows.length; j++){
                infoWindows[j].close();
        }
    });
    
    $.get('https://kyoto-map-20.herokuapp.com/locations/',function(locations,status){

      const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      
      for (var i = 0; i< locations.length; i++){
        
        //parsing lat and lon
        var t_lat=parseFloat(locations[i].lon);
        var t_lng=parseFloat(locations[i].lat);

        const location = locations[i];
        const marker = new google.maps.Marker({ 
          position: {lat:t_lat,lng:t_lng},
          map: ourmap,
          category: location.category,
          icon: image
        });      

        var contentString = '<div class="container">'+   
                                '<div id="" class="row">' +
                                    '<div id="" class="col-8">' +
                                      '<h2 id="">'+location.pname+'</h2>' +                                     
                                    '</div>'+
                                    '<div id="" class="col-4">' +
                                      '<button id="uploadPic" class="btn btn-danger">Upload picture'+
                                        '<svg style="margin-left:5px;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">'+
                                          '<path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>'+
                                        '</svg>'+
                                      '</button>' +                                     
                                    '</div>'+
                                '</div>';
        
        contentString = contentString +  '<div class="row">';   

        for (var k = 0; k<location.imageUrls.length; k++){ 
            contentString = contentString +
            '<div class="col-md-4">'+
                 '<div class="thumbnail">'+
                 '<img src="'+location.imageUrls[k]+'" style="width:100%" class="img-rounded" alt="image1">'+             
                 '</div>' +
            '</div>'; 
        } 
        
        contentString = contentString +  '</div>';   

         contentString = contentString +
          '</div>' +
          '<div id="">' +
          "<p></p>"+
          "<p>"+ location.description+"</p>"+
          "<p><a style='color:blue; text-decoration: underline;' href="+location.webUrl+">Press here to read more about "+location.pname+"</a></p>"+
          "</div>" +
          "</div>";
        
        //const contents = contentString;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });    

        google.maps.event.addListener(marker, "click", function (event) {
            for(var j = 0; j < infoWindows.length; j++){
                infoWindows[j].close();
            } //ok
            infowindow.setPosition(marker.position);
            infowindow.open(map, marker);
        }); //ok
        
        infoWindows.push(infowindow);
        
        gmarkers1.push(marker);
        
        }     //for ok    
    });// get ok
    
 } //ok function

  /**
 * Function to hide markers
 */

hideMarkers = function()
{
    var marker;
   for (i = 0; i < gmarkers1.length; i++) {
      marker = gmarkers1[i];
      marker.setVisible(false);
    }  
}

 /**
 * Function to show all markers
 */

showMarkers = function()
{
    var marker;
   for (i = 0; i < gmarkers1.length; i++) {
      marker = gmarkers1[i];
      marker.setVisible(true);
    }  
}

/**
 * Function to show markers by category
 */
filterMarkers = function(category)
{
   var marker;
   for (i = 0; i < gmarkers1.length; i++) {
      //alert(gmarkers1[i].position);
      marker = gmarkers1[i];
      // If is same category or category not picked
      if(marker.category == category)
      {
          marker.setVisible(true);
      }
      
    }  
}