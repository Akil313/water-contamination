import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the QrscannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html',
})
export class QrscannerPage {
  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public androidPermissions: AndroidPermissions, private barcodeScanner: BarcodeScanner,
	public db: AngularFireDatabase,public afAuth: AngularFireAuth) { }

    scannedCode = null;


    scanCode(){
		this.afAuth.authState.subscribe( user => {
		  this.itemsRef = this.db.list('device/1');
		  this.barcodeScanner.scan().then((barcodeData) => {
			  var userId = user.uid;
			this.scannedCode = barcodeData.text;
			var code = barcodeData.text;
			{
					this.itemsRef.push({ ID:code,Owner:userId  });
			}
		  }, (err) => {
			alert("Text");
		  });
		});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscannerPage');
  }

}
