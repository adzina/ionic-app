import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import { BackendService } from '../../services/backend.service';
import {MenuLessonComponent} from '../menu-lesson/view-menu-lesson.component';
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
  url: string;
  constructor(private _loginService: LoginService,
              private _navCtrl: NavController,
              private _backendService: BackendService,
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

  //this.url="http://10.0.2.2:1337/user/login";
  //this.url="http://localhost:1337/user/login";
  this.url='http://54976-1-fba7f6-01.services.oktawave.com:1337/user/login';
  this.http.get('assets/config.json')
  .map(res => res.json())
  .subscribe((api_data) => {
     this.http.post(this.url, body, { headers: this.contentHeader })
          .map(res => res.json())
          .subscribe(
            data => {this.authSuccess(data.id_token);
              this._loginService.setUserID(data.id);
              this._loginService.setUsername(data.first_name);
              this._navCtrl.push(MenuLessonComponent);
            },
            err => {this.error = err, this.presentToast(err)}
          );
  });


  };
  authSuccess(token) {
   this.error = null;
   this.storage.set('token', token);
 }
  presentToast(msg:string) {
    let toast = this._toast.create({
        message: msg,
        duration: 5000,
        position: 'middle'
      });
  toast.present();
}
}
interface ItemsResponse {
  email: string,
  password: string,
  first_name: string,
  id:string
}
