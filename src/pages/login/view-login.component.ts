import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {ChooseModeComponent} from '../choose-mode/view-choose-mode.component';
import { RegisterComponent} from '../register/view-register.component';
import {TeacherDashboardComponent} from '../teacher-dashboard/view-teacher-dashboard.component';
import {Headers, Http} from "@angular/http";
import {AuthService} from "../../services/auth/auth";
import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';

@Component({
  selector: 'login',
  templateUrl: 'view-login.component.html',
})

export class LoginComponent{
  inputType: string;
  email: string;
  password: string;
  contentHeader = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper = new JwtHelper();
  user: string;
  auth: AuthService;
  constructor(private _loginService: LoginService,
              private _navCtrl: NavController,
              private _toast: ToastController,
              private http: Http,
              private storage: Storage){

    this.auth = AuthService;
    this.inputType = 'password';
    this.email="";
    this.password="";
    this._loginService.setLoggedIn(false);

    storage.ready().then(() => {
      storage.get('profile').then(profile => {
        this.user = JSON.parse(profile);
      }).catch(console.log);
    });
  }

  hideShowPassword(){
    if (this.inputType == 'password')
      this.inputType = 'text';
    else
      this.inputType = 'password';
  };

submit(type:string){
  var email=this.email;
  var pswd=this.password;
  let body = JSON.stringify({ email, pswd });
  this.http.post('http://localhost:1337/user/login', body, { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {this.authSuccess(data.id_token);
          this._loginService.setUserID(data.id);
          this._navCtrl.push(ChooseModeComponent);
        },
        err => {this.error = err, alert(err),this.presentToast()}
      );

  };
  authSuccess(token) {
   this.error = null;
   this.storage.set('token', token);
  //  this.user = this.jwtHelper.decodeToken(token).user_name;
  //  console.log(this.user);
  // this.storage.set('profile', this.user);
 }
  presentToast() {
    let toast = this._toast.create({
        message: 'Wrong credentials',
        duration: 5000,
        position: 'middle'
      });
  toast.present();
}
register(){
  this._navCtrl.push(RegisterComponent);
}
}
interface ItemsResponse {
  email: string,
  password: string,
  first_name: string,
  id:string
}
