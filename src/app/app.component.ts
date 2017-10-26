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
        var userId=user.uid;
        var userLoc="Users/"+userId;
        console.log(userLoc);
        this.meh = this.afd.list(userLoc).valueChanges();
        this.meh = this.afd.list(userLoc).valueChanges().map(p =>{
          console.log(p[2], "email?");
          if(p[1] == true){
            globalVar=true;
            this.rootPage = EmployeePage;
            authObserver.unsubscribe();
          }
          else if(p[1] == false){
            this.rootPage = CustomerPage;
            authObserver.unsubscribe();
          }
          console.log(globalVar,"global");
          console.log(p);
          /*if(p[1]== true){
          console.log("YESSSSSSSSSSS!");
          this.navCtrl.setRoot('EmployeePage');
          }else{
          this.navCtrl.setRoot('CustomerPage');
          }*/
          return p;
        });
      }
      else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });
    console.log(globalVar,"it works?");
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}