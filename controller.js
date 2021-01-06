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
    
    if ($('#nature').prop('checked') == true)
    {
        filterMarkers("park");
        filterMarkers("mountain");
        filterMarkers("river");
        filterMarkers("garden");

    }
    if ($('#temples').prop('checked') == true)
    {
        
    }
    if ($('#shrines').prop('checked') == true)
    {
    }
    if ($('#castles').prop('checked') == true)
    {
        
    }
    if ($('#museums').prop('checked') == true)
    {
    }
    if ($('#sightseeing').prop('checked') == true)
    {
       
    }
    if ($('#resandbars').prop('checked') == true)
    {
    }
    if ($('#hospitals').prop('checked') == true)
    {
    }
    if ($('#shopping').prop('checked') == true)
    {
        
    }
    if ($('#stations').prop('checked') == true)
    {
    }
    if ($('#others').prop('checked') == true)
    {
    }

});

}); 

var gmarkers1 = [];

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
        locations.push({lat:t_lat, lng:t_lng, description:data[i].description, name:data[i].jpname});
      }
      const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      for (var i=0;i<locations.length;i++){
        const location=locations[i];
        const cat = location.category;
        marker = new google.maps.Marker({
          position: {lat:location.lat,lng:location.lng},
          map: ourmap,
          category: cat,
          icon: image
        });

        const contentString =
          '<div id="" class="">' +
          '<div id="">' +
          "</div>" +
          '<h1 id="">'+location.name+'</h1>' +
          '<div id="">' +
          "<p>"+ location.description+"</p>"
          "</div>" +
          "</div>";
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {        
          infowindow.open(map, marker);
        });

        gmarkers1.push(marker);
        
        };         
    });
  }

  /**
 * Function to hide markers by category
 */

hideMarkers = function()
{
   for (i = 0; i < gmarkers1.length; i++) {
      marker = gmarkers1[i];
      marker.setVisible(false);
    }  
}

/**
 * Function to show markers by category
 */
filterMarkers = function(category)
{
   alert("in filter markers: "+category);
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