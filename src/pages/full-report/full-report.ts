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
  selector: 'page full-report',
  templateUrl: 'full-report.html'
})

export class NavigationDetailsPage {

  constructor(params: NavParams) {
  }
  ionViewDidLoad(){
	  console.log("navigation");
  }
}


@Component({
	  template:`<ion-header>

  <ion-navbar>
    <ion-title>Full Report</ion-title>
  </ion-navbar>
  
</ion-header>
<ion-content>
  <ion-list>
      <span *ngFor="let k of temp| async">
	  <button ion-item block  (click)="openNavDetailsPage(item)" icon-start style="text-align:center">
	  <p>{{ k.Date }}</p>
      <div style="font-size: 14px">
        <h2>Location: <strong>{{ k.Location }}</strong></h2>
        <h2>Contamination Level: <strong>{{ k.Level }}</strong></h2>
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
  constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {
	this.afAuth.authState.subscribe((user: firebase.User) => {
	var temp1 = user.email.toString();
		var email="";
		var i;
		for(i of temp1){
			if(i == "."){
				break;
			}else{
				email+=i;
		}
		var str="Users/";
		var str2="/Full Report";
		this.temp = this.afd.list(str+email+str2).valueChanges();
		this.temp = this.afd.list(str+email+str2).valueChanges().map(p =>{
		return p.reverse();
		});
  }
  });
  }
	//console.log(afd.list('/Date', ref => ref.limitToFirst(2)));
	//bks[1] = afd.list('/Date');
	//console.log(bks[1]);

  openNavDetailsPage() {
    this.nav.push(NavigationDetailsPage	);
  }

}