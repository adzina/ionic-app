import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker'
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {TeacherAddStudentsComponent} from '../teacher-add-students/view-teacher-add-students.component';
import {TeacherWordsPanelComponent} from '../teacher-words-panel/view-teacher-words-panel.component';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';


@Component({
  selector: 'teacher-choose-lessons',
  templateUrl: 'teacher-choose-lessons.component.html'
})

export class TeacherChooseLessonsComponent {

  lessons: word[];
  lessonsUnique: string[];
  rootPage=null;
  constructor(
    private _loginService:LoginService,
    private _userService: UserService,
    private _navCtrl: NavController,
    private _datePicker: DatePicker
  ) {
    //-----------------------------------------------------------------------------
    this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
    this.lessonsUnique=[];
    this.onlyUniqueLessons();
    //------------------------------------------------------------------------------


  }
  onlyUniqueLessons(){

    this.lessonsUnique[0]=this.lessons[0].lesson;
    var uniqueIndex=0;
    for(var i=1;i<this.lessons.length;i++){
      if(this.lessons[i].lesson!=this.lessonsUnique[uniqueIndex]){
        uniqueIndex++;
        this.lessonsUnique[uniqueIndex]=this.lessons[i].lesson;
      }
    }


  }
  choose(lessonNr: string) {
    this._userService.chooseLesson(lessonNr);
      let op=this._userService.getOption();
      if(op==0)
        this._navCtrl.push(TeacherWordsPanelComponent);

      if(op==1)
        this._navCtrl.push(TeacherAddStudentsComponent);
  }
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }
}

interface word {
  eng: string;
  pol: string;
  lesson: string;
  id: string;
}
