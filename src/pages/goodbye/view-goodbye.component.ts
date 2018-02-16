import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {LoginComponent} from '../login/view-login.component';


@Component({
  selector: 'goodbye',
  templateUrl: 'view-goodbye.component.html',
})

export class GoodbyeComponent{

  user: string;
  constructor(private _loginService:LoginService,private _navCtrl: NavController){
    this.user=this._loginService.getUserName();
    this._loginService.setLoggedIn(false);
    this._loginService.setUserType(null);
    this._loginService.setUsername(null);
    localStorage.removeItem('token');
  }
  login(){
    this._navCtrl.push(LoginComponent);
  }
}
