import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
 
@Component({
  selector: 'summary-about',
  templateUrl: 'summary.html'
})

export class SummaryPage {
public  Date: Observable<any[]>;
 
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public afd: AngularFireDatabase) {
	  
	//this.Date= this.firebaseProvider;
	//this.Date = afd.list('/Date/');
	//console.log(afd.list('Date', ref => ref.limitToLast(2)));
	
	//this.afd.list<0>('Date').valueChanges().subscribe(console.log);
  }
	//console.log(afd.list('/Date', ref => ref.limitToFirst(2)));
	//bks[1] = afd.list('/Date');
	//console.log(bks[1]);
}


