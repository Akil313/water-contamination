import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmployeePage } from '../employee/employee';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;

  public temp : Observable<any>;
  public usersRef : AngularFireObject<any>;

  constructor(public nav: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.afAuth.authState.subscribe( user => {
          this.usersRef = this.db.object('user/'+user.uid);
          var newUser = {
            "admin" : false,
            "devices" : null,
            "email" : user.email,
            "report" : null
          };
          this.usersRef.set(newUser);
        });

        this.nav.setRoot(EmployeePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}