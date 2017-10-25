import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SummaryPage } from '../summary/summary';
import { MapPage } from '../map/map';
import { FullReportPage } from '../full-report/full-report';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()


@IonicPage()
@Component({
  templateUrl: 'customer.html'
})


export class CustomerPage {
  tab1Root = SummaryPage;
  tab2Root = MapPage;
  
  constructor(private navCtrl: NavController, private auth: AuthProvider) {

  }
  public logout() {
    this.auth.logoutUser().then( () => this.navCtrl.setRoot(LoginPage));
    }
  }

