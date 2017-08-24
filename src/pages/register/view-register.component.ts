import { Component} from '@angular/core';
import {Toast} from '@ionic-native/toast';
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
  constructor(private _loginService:LoginService,
              private _navCtrl:NavController,
              private _toast: Toast) {
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
    this._toast.show("The account has been created, you can log in now","5000","bottom");
    
    this._navCtrl.pop();
    };



}
