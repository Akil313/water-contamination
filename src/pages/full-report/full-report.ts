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
var i = 0;
 
@Component({
	template:`
		<ion-header>
  			<ion-navbar>
    			<ion-title>Full Report</ion-title>
  			</ion-navbar>  
		</ion-header>
		
		<ion-content>
  			<ion-list>
			<span *ngIf="k">
	  					<h1>Date: {{ k.date}}</h1>
						<h1>Location: {{ k.location}}</h1>
						<h1>Contamination Level: {{ k.level}}%</h1>
						
			</span>
  			</ion-list>  
		</ion-content>
	`
})

export class NavigationDetailsPage {
	public  k: Observable<any[]>;
  constructor(public navParams: NavParams) {
	  this.k = navParams.get('k');

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
	  				<button ion-item block  (click)="openNavDetailsPage(k)" icon-start style="text-align:center;">
	  					<p>{{ k.date }}</p>
      					<div style="font-size: 14px">
        					<h2>Location: <strong>{{ k.location }}</strong></h2>
        					<h2>Contamination Level: <strong>{{ k.level }}%</strong></h2>
        					<br>
      					</div>
      					<p>tap for more details</p>
	  				</button>
	  			</span>
  			</ion-list>  
		</ion-content>
	`
})

export class FullReportPage {
	public  temp: Observable<any[]>;
	public j;
	constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			var userId = user.uid;
	        var dataLoc = "user/"+userId+"/report";
			this.temp = this.afd.list(dataLoc).valueChanges().map(p =>{
				return p.reverse();
			});
	  	});
	}
		//console.log(afd.list('/Date', ref => ref.limitToFirst(2)));
		//bks[1] = afd.list('/Date');
		//console.log(bks[1]);
	openNavDetailsPage( k) {
		this.nav.push(NavigationDetailsPage,{
		k});
		
	}
}