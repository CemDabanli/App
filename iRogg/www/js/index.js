var directionsDisplay= new google.maps.DirectionsRenderer();
var directionsService= new google.maps.DirectionsService();
 
var go;
var arrayPosi=[];
var positionGlobalStart;
var positionGlobalEnd;
var picture ;
var time=null;
var keyCounter=0;

//var storage = window.localStorage;
//var keyName = window.localStorage.key(0);


var app = {
    
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        
		$("#target").bind("tap",app.tapHandler);
		$("#Stop").bind("tap",app.tapStop);
		$("#Start").bind("tap",app.tapStart);
		$("#Speichern").bind("tap",app.tapSpeichern);
		
		
    },
	
	 tapHandler: function(event){
			//$(event.target).addClass("tap");
			alert("Hallo");
	},
	
	
	tapStart:function(event)
	{
		deleteArray();
		navigator.geolocation.getCurrentPosition(onSuccessStart, onError);
		document.getElementById("Stop").setAttribute("style","visibility:visible");
		document.getElementById("Speichern").setAttribute("style","visibility:hidden");
		time =new Date();
		
		
	},
	
	tapStop:function(event){
		go=false;
		/*alert("REAL "+arrayPosi.length);
		*/
		navigator.geolocation.getCurrentPosition(onSuccessEnd, onError);
		document.getElementById("Speichern").setAttribute("style","visibility:visible");
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.DATA_URL,
		targetWidth:55,
		targetHeight:55
		});
		
		var time2 =new Date();
		time2=(time2.getTime()-time.getTime())/60000;
		
		
		var sek = (time2*60)%60;
		var min = time2 - sek/60;
		sek = sek - sek%1;
		if(sek<10)
		{
			alert(min+":0"+sek);
			time=min+":0"+sek;
		}
		else
		{
			alert(min+":"+sek);
			time=min+":"+sek;
		}
		
		
	},
	
	
	
	tapSpeichern:function(event)
	{ 
		//navigator.geolocation.getCurrentPosition(add, onError);
		//window.localStorage.setItem(keyName, time);
		//alert("Gespeichert: "+window.localStorage.getItem(0);)
		localStorage.setItem("zeit",document.getElementById("map_canvas"));
		//console.log(localStorage.getItem("zeit"));
		//element.innerHTML=localStorage.getItem("zeit");
		var m=document.getElementById("map_canvas");
		var austausch=localStorage.getItem("zeit");
		m.innerHTML=austausch;
		
		/*localStorage.setItem("key",keyCounter);
		
		alert("key alt"+localStorage.getItem("key"));
		keyCounter=localStorage.getItem("key");
		keyCounter=parseInt(keyCounter)+1;
		localStorage.setItem("key",keyCounter);
		alert("key neu"+localStorage.getItem("key"));*/
		
	}
	
	
	
	
};

/*function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; //Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  //deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; //Distance in km
  return d;
}*/

	function deleteArray()
	{
		arrayPosi=[];
	}

	function add(position)
	{
		
		var latitude=(position.coords.latitude);
		var longitude=(position.coords.longitude);
		console.log(latitude);
		console.log(longitude);
		
		arrayPosi.push({location: new window.google.maps.LatLng(latitude,longitude),stopover: false});
		/*
		arrayPosi.push({location: new window.google.maps.LatLng(48.458390, 7.943022),stopover: false});
		arrayPosi.push({location: new window.google.maps.LatLng(48.454073, 7.941026),stopover: false});
		arrayPosi.push({location: new window.google.maps.LatLng(48.448679, 7.941540),stopover: false});
		arrayPosi.push({location: new window.google.maps.LatLng(48.454554, 7.934431),stopover: false});
		arrayPosi.push({location: new window.google.maps.LatLng(48.458390, 7.943022),stopover: false});*/
		
	}

	function calculateRoute()
	{
		var request={
		  origin: new google.maps.LatLng(positionGlobalStart.coords.latitude,  positionGlobalStart.coords.longitude),
          destination:new google.maps.LatLng (positionGlobalEnd.coords.latitude,  positionGlobalEnd.coords.longitude),
			
		  
		  //origin:"Berlin",
		  //destination:"Paris",
          waypoints: arrayPosi,
          //optimizeWaypoints: true,
          travelMode: 'WALKING'
		  
		 
		};


	directionsService.route(request,function(result, status){	
	if(status=="OK"){
		directionsDisplay.setDirections(result);
	}
	});

	var map = showMap();
	return map;
	}
	
	function showMap()
	 {
		var mapOptions = 
		{
		zoom: 15,
		center: new google.maps.LatLng(positionGlobalStart.coords.latitude,positionGlobalStart.coords.longitude ),
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var marker = new google.maps.Marker({
    position: new google.maps.LatLng(positionGlobalEnd.coords.latitude,positionGlobalEnd.coords.longitude),
    title:"Endpoint",
	icon: picture,
	draggable:true
	//icon: imageEnd
});
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	directionsDisplay.setMap(map);
	return map;
	}
	

	function onSuccess(imageData) {
    picture = "data:image/jpeg;base64," + imageData;
	go=false;
		//alert("REAL "+arrayPosi.length);
		
		navigator.geolocation.getCurrentPosition(onSuccessEnd, onError);
		document.getElementById("Speichern").setAttribute("style","visibility:visible");
    
	}

	function onFail(message) {
    alert('Failed because: ' + message);
	}
	
	function onSuccessStart(position) {
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
		  //arrayPosi.push(position);
		  
		  positionGlobalStart=position;
		  go=true;
		  
		  
			  
			  myLoop();
				  //navigator.geolocation.getCurrentPosition(getPosi, onError);				  
			  
			  
		  
		  
		  
	}
	function myLoop () {
	 setTimeout(function () { 
      
		
      if (go) {
		  navigator.geolocation.getCurrentPosition(add, onError);	
			
         myLoop();             
      }
			  
   }, 1000)
}
	
	function getPosi(postion)
	{
		arrayPosi.push(position);
	}
	
	
	function onSuccessEnd(position) {
		  //arrayPosi.push(position);
		  positionGlobalEnd=position;
		  calculateRoute();
		  //alert(getDistanceFromLatLonInKm(getPosi[0].latitude,getPosi[0].longitude,getPosi[getPosi.length-1].latitude,getPosi[getPosi.length-1].longitude));
	}
	function onError(error) {
    alert('Fehlercode: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	}
	
	
	
