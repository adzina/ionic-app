import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {NavController} from 'ionic-angular';
import {TeacherWordsPanelComponent} from '../teacher-words-panel/view-teacher-words-panel.component';
import {TeacherAddStudentsComponent} from '../teacher-add-students/view-teacher-add-students.component';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import {SidePanelLessonsComponent} from '../side-panel-lessons/side-panel-lessons.component';

@Component({
  selector: 'teacher-dashboard',
  templateUrl: './view-teacher-dashboard.component.html'
})
export class TeacherDashboardComponent {

  constructor(private _loginService: LoginService,
              private _navCtrl:NavController,
              private _userService: UserService){  }
  setAction(a:number){
    this._userService.chooseOption(a);
    this._navCtrl.push(SidePanelLessonsComponent);
  }
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }

}
