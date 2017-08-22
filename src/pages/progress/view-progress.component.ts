import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';

@Component({
  selector: 'my-progress',
  templateUrl: './view-progress.component.html'
})
export class ProgressComponent{

  constructor(private _loginService: LoginService,private _navCtrl:NavController) { }

  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }

}
