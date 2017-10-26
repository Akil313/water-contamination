import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FullReportPage } from '../full-report/full-report';
import { SummaryPage } from '../summary/summary';
import { LoginPage } from '../login/login';
import { QrscannerPage } from '../qrscanner/qrscanner';
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
  tab1Root = FullReportPage;
  tab2Root = SummaryPage;
  tab3Root = QrscannerPage;
  
  constructor(private navCtrl: NavController, private auth: AuthProvider) {

  }
  public logout() {
    this.auth.logoutUser().then( () => this.navCtrl.setRoot(LoginPage));
    }
  }

