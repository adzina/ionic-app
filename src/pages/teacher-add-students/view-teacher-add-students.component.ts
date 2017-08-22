import { Component, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';

@Component({
  selector: 'teacher-add-students',
  templateUrl: './view-teacher-add-students.component.html'
})
export class TeacherAddStudentsComponent{

  chosenLesson: string;
  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _navCtrl:NavController) { }

  handleLessonChosen(x:string){
    this.chosenLesson=x;
    /*
    students2lessons
    findAll
    in: lesson_name
    out: [studentID]

    students
    finaAll
    out: [students]

    jeśli student znajduje się na pierwszej i drugiej liście, to obok jego nazwiska przycisk "remove" wpp "add"
    */
  }
  goback(){
    this._userService.goback();
  }
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }
}
