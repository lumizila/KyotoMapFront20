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

