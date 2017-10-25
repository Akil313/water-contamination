import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'page full-report',
  templateUrl: 'full-report.html'
})

export class NavigationDetailsPage {

  constructor(params: NavParams) {
  }
}


@Component({
	  template: `
<ion-header>

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
        <h2>Contamination Level: <strong>{{ k.Contamination }}</strong></h2>
        <br>
      </div>
      <p>tap for more details</p>
	  </button>
	  </span>
  </ion-list>
</ion-content>


`

// })
})

export class FullReportPage {
public  temp: Observable<any[]>;
 
  constructor(public nav: NavController, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase) {
	  
	//this.Date= this.firebaseProvider;
	this.temp = afd.list('Full Report').valueChanges();
	//this.temp = afd.list('Full Report', { preserveSnapshot: true });
	//this.Date = afd.list('/Date/');
	//console.log(afd.list('Date', ref => ref.limitToLast(2)));
	
	//this.afd.list<0>('Date').valueChanges().subscribe(console.log);
  }
	//console.log(afd.list('/Date', ref => ref.limitToFirst(2)));
	//bks[1] = afd.list('/Date');
	//console.log(bks[1]);

  openNavDetailsPage() {
    this.nav.push(NavigationDetailsPage	);
  }

}