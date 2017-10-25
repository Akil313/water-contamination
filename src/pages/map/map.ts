import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
  
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	map: GoogleMap;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform, private geolocation: Geolocation) {
	platform.ready().then(() => {
	setTimeout(()=>{
		console.log("sigh1");
      this.loadMap();
	  },100);
	console.log("sigh4");
	
  });
  }
  
  
  loadMap() {
  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
	let location1 = new LatLng(10.71172, -61.41690399999999);
    let location2 = new LatLng(10.6509155, -61.4191452);
	console.log(location);

    this.map = new GoogleMap('map', {
      'controls': {
        'compass': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
	  
	  'camera': {
		  'target':location,
		  'zoom':20
	  }
    });

	
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
	console.log('Map is ready!');
	
	let markerOptions: MarkerOptions = {
  'icon': {url: 'www/assets/icon/image.png'}
};
	this.map.addMarker({
	'position': location,
	'icon': 'blue',
	'title': "This is me",
	'visible': true,
	'disableAutoPan':false
	});
	
	this.map.addMarker({
	'position': location1,
	'title': "WASA Lluengo Naranjo Water Treatment Plant",
	'visible': true,
	'disableAutoPan':false
	});
	
	this.map.addMarker({
	'position': location2,
	'title': "Water And Sewerage Authority Head Office",
	'visible': true,
	'disableAutoPan':false
	});
	});
	

  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

}



