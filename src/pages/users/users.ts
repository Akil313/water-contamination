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
      			<span *ngFor="let j of temp| async">
	  				<button ion-item block  (click)="openNavDetailsPage(item)" icon-start style="text-align:center;">
	  					<p>UserID = {{j.email}}</p>
	  					<p *ngIf=" j.admin == true">User Type = Admin</p>
	  					<p *ngIf=" j.admin == false">User Type = Normal</p>
	  				</button>
	  			</span>
  			</ion-list>  
		</ion-content>
	`
})

export class UsersPage {

	public  temp: Observable<any>;

	constructor(public nav: NavController, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {

	}

	ionViewDidLoad() {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			var dataLoc="user";
			this.temp = this.afd.list(dataLoc).valueChanges().map(j =>{
				console.log(j);
				return j;
			});
		});	
	}

	openNavDetailsPage() {
		this.nav.push(NavigationDetailsPage	);
	}
}