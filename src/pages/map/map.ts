import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})
export class MapPage {

	public temp: Observable<any>;
	map: GoogleMap; 

	constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform, private geolocation: Geolocation, public afd: AngularFireDatabase, public afAuth: AngularFireAuth) {
		platform.ready().then(() => {
			setTimeout(()=>{
				this.loadMap();
			},100);
		});
	}

	getRecentDataset(arr, device) {
		console.log(arr, device);
		var datedArr = [];
		for(var i in arr){
			if(arr[i].location == device){
				var date = new Date(arr[i].date.split(/\//).reverse().join("/")).getTime();
				datedArr.push(arr[i]);
			}
		}
		var max = 0;
		for(var p in datedArr){
			if(datedArr[p].date > datedArr[max].date){
				max=parseInt(p);
			}
		}
		/*console.log(dates);
		var maxCalc = Math.max.apply(Math, dates);
		var maxDate = new Date(maxCalc).toJSON().slice(0, 10);
		console.log(maxDate, device);*/
		return datedArr[max];
	}
/*
	var o = [{
		x : 3,
		level: 21
	},{
		x: 5,
		level: 22
	}];
	var max = 0;
	for(var i in o)
		if(o[i].x > o[max].x) max = i;
	return o[max];
*/
	loadMap() {
		var mapData = [];
		this.afAuth.authState.subscribe((user: firebase.User) => {
			var dataLoc="user";
			this.temp = this.afd.object(dataLoc).valueChanges().map(j =>{
				for(var i in j){
					for(var n in j[i].devices){
						var loc = new LatLng(parseFloat(j[i].devices[n].loc.split(",")[0]), parseFloat(j[i].devices[n].loc.split(",")[1]));
						var recentLevel = this.getRecentDataset(j[i].report, j[i].devices[n].name);
						var level = recentLevel.level;
						mapData.push({loc, level});
					}
				}
			});
		});

		this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
			let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
			let location1 = new LatLng(10.71172, -61.41690399999999);
			let location2 = new LatLng(10.6509155, -61.4191452);

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

				for(var i in mapData){
					this.map.addMarker({
						'position': mapData[i].loc,
						'icon': 'green',
						'title': "Contamination Level:"+mapData[i].level,
						'visible': true,
						'disableAutoPan':false
					});
				}

				this.map.addMarker({
					'position': location,
					'icon': 'red',
					'title': "My Location",
					'visible': true,
					'disableAutoPan':false
				});

				this.map.addMarker({
					'position': location1,
					'icon': 'blue',
					'title': "WASA Lluengo Naranjo Water Treatment Plant",
					'visible': true,
					'disableAutoPan':false
				});

				this.map.addMarker({
					'position': location2,
					'icon': 'blue',
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



