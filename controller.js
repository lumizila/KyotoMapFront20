$(document).ready(function(){
	$("#searchbutton").click(function(){
	//$.get('https://kyoto-map-20.herokuapp.com/',function(data,status){
	//$("#search").html(data);
	//alert(status)
	//});
		$.ajax({
			url:"https://kyoto-map-20.herokuapp.com/",
			type:'GET',
			dataType:'json',//addeddatatype
			success:function(res){
				console.log(res);
				alert(res);
			}
		});
	});
});