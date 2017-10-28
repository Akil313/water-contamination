import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Dialogs } from '@ionic-native/dialogs';
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
  public itemsRef: AngularFireObject<any>;
  public usersDevRef: AngularFireObject<any>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public androidPermissions: AndroidPermissions, private barcodeScanner: BarcodeScanner,
	public db: AngularFireDatabase,public afAuth: AngularFireAuth, private dialogs: Dialogs) { }

    scannedCode = null;

    scanCode(){
		this.afAuth.authState.subscribe( user => {
			var userId = user.uid;
			this.itemsRef = this.db.object('device');
			
			this.barcodeScanner.scan().then((barcodeData) => {
				var code = barcodeData.text;

				this.usersDevRef = this.db.object('user/'+userId+"/devices/"+code);

				var name = this.dialogs.prompt("Device name").then(data => {
					var location = "10.2388486, -61.5844046";
					this.usersDevRef.set({name: data.input1, loc: location});
				}).catch(err => console.log("Error", err));

				this.itemsRef.set({ id:code,owner:userId});
			},
			(err) => {
				console.log(err);
			});
		});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscannerPage');
  }

}
