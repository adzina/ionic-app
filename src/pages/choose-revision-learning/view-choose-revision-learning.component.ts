import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import {DashboardComponent} from '../dashboard/view-dashboard.component';


@Component({
  selector: 'choose-revision-learning',
  templateUrl: 'view-choose-revision-learning.component.html',
})

export class ChooseRevisionLearningComponent{

  mode: number;
  constructor(private _userService: UserService, public _navCtrl: NavController){
    this.mode=null;
  }
  setmode(m:number){
    this._userService.setModeWords(m);
    this._navCtrl.push(DashboardComponent);


}

logout(){
  this._navCtrl.push(GoodbyeComponent);
}
}
