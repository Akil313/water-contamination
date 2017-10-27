import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase/app';
 
@Component({
  selector: 'page users',
  templateUrl: 'users.html'
})

export class NavigationDetailsPage {

  constructor(params: NavParams) {
  }
  ionViewDidLoad(){
	console.log("navigation");
  }
}


@Component({
	template:`
		<ion-header>
  			<ion-navbar>
    			<ion-title>Full Report</ion-title>
  			</ion-navbar>  
		</ion-header>
		
		<ion-content>
  			<ion-list>
      			<span *ngFor="let k of temp| async">
	  				<button ion-item block  (click)="openNavDetailsPage(item)" icon-start style="text-align:center;">
	  					<p>UserID = {{k}}</p>
	  					<p>permission = {{temp[k]}}</p>
	  				</button>
	  			</span>
  			</ion-list>  
		</ion-content>
	`
})

export class UsersPage {

	public  temp: Observable<any>;

	constructor(public navCtrl: NavController, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {

	}

	ionViewDidLoad() {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			var userId=user.uid;
			var dataLoc="user";			
			this.temp = this.afd.object(dataLoc).valueChanges().map(j =>{
				var keys = Object.keys(j);
				console.log(j);
				return keys;
			});
		});	
	}

/*
	constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			var userId = user.uid;
	        var dataLoc = "user";
			this.temp = this.afd.list(dataLoc).valueChanges().map(p =>{
				console.log(p);
			});
	  	});
	}

	openNavDetailsPage() {
		this.nav.push(NavigationDetailsPage	);
	}*/
}