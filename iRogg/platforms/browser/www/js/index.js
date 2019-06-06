/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 
var posStart;
var posEnd;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //FOR MY OWN CODE
		$("#target").bind("tap",app.tapHandler);
		$("#Stop").bind("tap",app.tapStop);
		$("#Position").bind("tap",app.tapPosition);
		$("#Map").bind("tap",app.tapMap);
		
		
    },
	
	 tapHandler: function(event){
			//$(event.target).addClass("tap");
			alert("Hallo");
	},
	
	tapStop:function(event){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.DATA_URL
		});
		navigator.geolocation.getCurrentPosition(onSuccessEnd, onError);
		alert("Stop");
	},
	
	tapPosition:function(event){
		
		navigator.geolocation.getCurrentPosition(onSuccessPos, onError);
		alert("Start");
	},
	
	tapMap:function(event){
		alert("Map");
		var map = new GoogleMap();
		map.initialize();
		
	}
	
	
};
	function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
	}

	function onFail(message) {
    alert('Failed because: ' + message);
	}
	
	function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 
		
		return dist;
	}
}
	
	
	
	function onSuccessPos(position) {
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
		posStart=position;
		  
}

function onSuccessEnd(position) {
   
	posEnd=position;  
}

function onError(error) {
    alert('Failed because: ' + error.message);
	}
	
function GoogleMap(){

this.initialize = function(){
var map = showMap();
}

var showMap = function(){
var mapOptions = {
zoom: 4,
center: new google.maps.LatLng(-33, 151),
mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

return map;
}
}


/*
$(function() {
$("#target").bind("tap",tapHandler);

function tapHandler(event){
$(event.target).addClass("tap");
alert("Hallo");
}
});
//bsp
var punkt={
x:10,
y:5,
distance:function(a,b)
{//code
}
};*/