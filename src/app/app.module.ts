import { NgModule, ErrorHandler } from '@angular/core';
import { AuthProvider } from '../providers/auth';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { SummaryPage } from '../pages/summary/summary';
import { MapPage } from '../pages/map/map';
import { EmployeePage } from '../pages/employee/employee';
import { CustomerPage } from '../pages/customer/customer';
import { EmployeeModule } from '../pages/employee/employee.module';
import { CustomerModule } from '../pages/customer/customer.module';
import { BrowserModule } from '@angular/platform-browser';
import { FullReportPage } from '../pages/full-report/full-report'; //Navigation
import { FullReportPage as NavigationBasicPage, NavigationDetailsPage } from '../pages/full-report/full-report'; //Navigation
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';// Import the AF2 Module
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseProvider } from './../providers/firebase/firebase';



// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDI5HECL01D_Gg8V3_CGbHmmZd9OiOxWIE",
  authDomain: "water-contamination.firebaseapp.com",
  databaseURL: "https://water-contamination.firebaseio.com/",
  storageBucket: "",
  messagingSenderId: "886793828530"
};
@NgModule({
  declarations: [
    MyApp,
    SummaryPage,
    MapPage,
	FullReportPage,
	NavigationBasicPage,
	NavigationDetailsPage,
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFirestoreModule.enablePersistence(),
	AngularFireDatabaseModule,
	AngularFireAuthModule,
	EmployeeModule,
	CustomerModule,
	LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SummaryPage,
	EmployeePage,
	CustomerPage,
	LoginPage,
    MapPage,
	NavigationBasicPage,
    NavigationDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
	GoogleMaps,
	AuthProvider,
    FirebaseProvider
  ]
})
export class AppModule {}

