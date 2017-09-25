import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {ChooseModeComponent} from '../choose-mode/view-choose-mode.component';
import { RegisterComponent} from '../register/view-register.component';
import {TeacherDashboardComponent} from '../teacher-dashboard/view-teacher-dashboard.component';

@Component({
  selector: 'login',
  templateUrl: 'view-login.component.html',
})

export class LoginComponent{
  inputType: string;
  email: string;
  password: string;
  constructor(private _loginService: LoginService,
              private _navCtrl: NavController,
              private _toast: ToastController,
              private http: HttpClient){
    this.inputType = 'password';
    this.email="";
    this.password="";
    this._loginService.setLoggedIn(false);
  }

  hideShowPassword(){
    if (this.inputType == 'password')
      this.inputType = 'text';
    else
      this.inputType = 'password';
  };

submit(type:string){
  var results: ItemsResponse;
  var first_name: string;
  var http_string="http://localhost:1337/users/"+this.email
  this.http.get<ItemsResponse>(http_string).subscribe(
    data => {

        if(this.password==data.password){
            this._loginService.setUserType(type);
            this._loginService.setUserID(data.id);
            this._loginService.setLoggedIn(true);
            this._loginService.setUsername(data.first_name);
            this._navCtrl.push(ChooseModeComponent);
      }
      else{
        this.presentToast();
      }
    },
    (error)=>{
      this.presentToast();

    });
  };
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
