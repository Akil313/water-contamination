import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmployeePage } from '../../pages/employee/employee';
import { CustomerPage } from '../../pages/customer/customer';
import * as firebase from 'firebase';

/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
  template: `  <span *ngFor="let j of meh| async">
	  </span> `
})
export class NewPage {
	public  meh: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afd: AngularFireDatabase,public afAuth: AngularFireAuth,public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
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
		}
		var str="Users/";
		this.meh = this.afd.list(str+email).valueChanges();
		this.meh = this.afd.list(str+email).valueChanges().map(p =>{
		var name="name:";
		var admin = "admin";
		console.log(p[2], "email?");
		for(var i=0;i<p.length;i++){
			if((p[2] == email) && (p[1] == true)){
				this.navCtrl.setRoot('EmployeePage');
			}else if((p[2] == email) && (p[1] == false)){
				this.navCtrl.setRoot('CustomerPage');
				
			}
		}
		console.log(p);
		/*if(p[1]== true){
			console.log("YESSSSSSSSSSS!");
			this.navCtrl.setRoot('EmployeePage');
		}else{
			this.navCtrl.setRoot('CustomerPage');
		}*/
		return p;
	});
});
	/*for(var m=0;m<1000;m++){
		console.log(m);
	}*/
    console.log('ionViewDidLoad NewPage');
	//.navCtrl.setRoot('EmployeePage');
  }

}
