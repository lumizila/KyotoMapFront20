$(document).ready(function(){

$("#tyaExample").click(function(){
    $.get('https://kyoto-map-20.herokuapp.com/locations/',function(data,status){
      alert("The jpname, description, latitude of the first location returned is:")
      alert("jpname: "+data[0].jpname+" description: "+data[0].description+" latitude: "+data[0].lat);
      alert("Only the category of the first location locations is...")
      alert(data[0].category);
      alert("The jpname, description, latitude of the second location returned is:")
      alert("jpname: "+data[1].jpname+" description: "+data[1].description+" latitude: "+data[1].lat);
    });
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
    const ourmap = new google.maps.Map(document.getElementById("map"), { //ok
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
      /*
      for (var i=0;i<locations.length;i++){
        
        //parsing lat and lon
        var t_lat=parseFloat(locations[i].lon);
        var t_lng=parseFloat(locations[i].lat);

        const location=locations[i];
        const marker = new google.maps.Marker({ 
          position: {lat:t_lat,lng:t_lng},
          map: ourmap,
          category: location.category,
          icon: image
        }); 

        /*

        var contentString = '<div id="" class="">' +
          '<h1 id="">'+location.pname+'</h1>' +         
          '<div class="row">';

        for (var i=0;i<location.imageUrls.length;i++){ //ok
            contentString = contentString +
            '<div class="col-md-4">'+
                 '<div class="thumbnail">'+
                 '<img src="'+location.imageUrls[i]+'" style="width:100%" class="img-rounded" alt="image1">'+             
                 '</div>' +
            '</div>'; 
        } //ok
        
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
        });  //ok   

        google.maps.event.addListener(marker, "click", function (event) {
            for(var j = 0; j < infoWindows.length; j++){
                infoWindows[j].close();
            } //ok
            infowindow.setPosition(marker.position);
            infowindow.open(map, marker);
        }); //ok
        
        infoWindows.push(infowindow);

        gmarkers1.push(marker);
        */
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