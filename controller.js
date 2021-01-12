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

function initMap() {
    const garden = { lat: 35.023138536118545, lng: 135.76386160876868 };
    const ourmap = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: garden,
    });


    $.get('https://kyoto-map-20.herokuapp.com/locations/',function(data,status){

      var locations=new Array();
      for (var i=0;i<data.length;i++){
        var t_lat=parseFloat(data[i].lon);
        var t_lng=parseFloat(data[i].lat);
        locations.push({lat:t_lat, lng:t_lng, description:data[i].description, name:data[i].pname, category:data[i].category, webUrl:data[i].webUrl});
      }
      const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      
      for (var i=0;i<locations.length;i++){
        const location=locations[i];
        marker = new google.maps.Marker({
          position: {lat:location.lat,lng:location.lng},
          map: ourmap,
          category: location.category,
          icon: image
        });

        const contentString =
          '<div id="" class="">' +
          '<div id="">' +
          "</div>" +
          '<h1 id="">'+location.name+'</h1>' +
          '<div id="">' +
          "<p>"+ location.description+"</p>"+
          "<p><a href="+location.webUrl+">Press here to read more about "+location.name+"</a></p>"+
          "</div>" +
          "</div>";
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });


        marker.addListener("click", () => {        
            //openInfoWindow(infowindow, map, marker);
            document.getElementsByClassName("locPopUp").style.visibility = "hidden";
            for(var j = 0; j < infoWindows.length; j++){
                InfoWindows[j].close();
            }
            infowindow.open(map, marker);
        });
        
        infoWindows.push(infowindow);

        gmarkers1.push(marker);
        
        };         
    });
  }

/*function to open the infowindow and close others*/
//function openInfoWindow (google.maps.InfoWindow infw, google.maps.Map mp, google.maps.Marker mark){


//}


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