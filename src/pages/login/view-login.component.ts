import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
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
  username: string;
  password: string;
  constructor(private _loginService: LoginService,
              private _navCtrl: NavController,
              private _toast: ToastController){
    this.inputType = 'password';
    this.username="";
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
  var string="/users/"+this.username;
//  this.http.get<ItemsResponse>(string).subscribe(data => {
//    results = data;
//  });

      this._loginService.setUserType(type);

      //if(this.password==results.password){
      //===================================================================
      if(this.username=="admin" && this.password=="admin"){
        this._loginService.setLoggedIn(true);
        this._loginService.setUsername(this.username);

        if(this._loginService.getUserType()=="student"){
          this._navCtrl.push(ChooseModeComponent);
        }
        else{
         this._navCtrl.push(TeacherDashboardComponent);
        }
      }
      else{
        this.presentToast();
      }
      //==================================================================
      /*

            this._loginService.setUserType(type);
            let correct=this._loginService.checkLogin();
            if(correct){
            if(this._loginService.getUserType()=="student"){
              this._router.navigate(['./choose-mode']);
            }
            else{
              this._router.navigate(['./teacher-dashboard']);
            }
          }
            else{
            alert('The credentials do not match any existing account')
          }
      */
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
  login: string,
  password: string
}
