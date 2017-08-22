import { Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'register',
  templateUrl: './view-register.component.html'
})
export class RegisterComponent {
  inputType: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  constructor(private _loginService:LoginService, private _navCtrl:NavController) {
    this.inputType = 'password';
    this.email="";
    this.password="";}

    hideShowPassword(){
      if (this.inputType == 'password')
        this.inputType = 'text';
      else
        this.inputType = 'password';
    };

  submit(type:string){
    /*
      GET students/teachers
          in: name, surname
          jeśli user nie istnieje:
      POST students/teachers
            in: email, password, name, surname
      else{
      alert("Account with this credentials already exists");
    }
    */
    alert("The account has been created, you can log in now");
    this._navCtrl.pop();
    };



}
