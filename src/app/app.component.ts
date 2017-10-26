declare var userType: any;

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { EmployeePage } from '../pages/employee/employee';
import { CustomerPage } from '../pages/customer/customer';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  public  meh: Observable<any[]>;
  public globalVar=false;

  constructor(platform: Platform, afAuth: AngularFireAuth, private splashScreen: SplashScreen,public afd: AngularFireDatabase, 
    private statusBar: StatusBar) {
    const authObserver = afAuth.authState.subscribe( user => {
		console.log(user);
      if (user) {
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
		console.log(str+email);
		this.meh = this.afd.list(str+email).valueChanges();
		this.meh = this.afd.list(str+email).valueChanges().map(p =>{
			console.log("hey");
		var name="name:";
		var admin = "admin";
		console.log(p[2], "email?");
		for(var i=0;i<p.length;i++){
			if((p[2] == email) && (p[1] == true)){
				console.log("global");
				this.globalVar=true;
				console.log(this.globalVar,"global");
				this.rootPage = EmployeePage;
				authObserver.unsubscribe();
				break;
			}else if((p[2] == email) && (p[1] == false)){
				console.log("global");
				console.log(this.globalVar,"global");
				this.rootPage = CustomerPage;
				authObserver.unsubscribe();
				break;
				
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
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });
	console.log(this.globalVar,"it works?");

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
