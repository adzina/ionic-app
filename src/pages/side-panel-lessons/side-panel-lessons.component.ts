import { Component} from '@angular/core';
import {DatePicker} from '@ionic-native/date-picker'
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {DashboardComponent} from '../dashboard/view-dashboard.component';
import {TeacherAddStudentsComponent} from '../teacher-add-students/view-teacher-add-students.component';
import {TeacherWordsPanelComponent} from '../teacher-words-panel/view-teacher-words-panel.component';


@Component({
  selector: 'side-panel-lessons',
  templateUrl: 'side-panel-lessons.component.html'
})

export class SidePanelLessonsComponent {

  lessons: word[];
  lessonsUnique: string[];
  rootPage=null;
  constructor(
    private _loginService:LoginService,
    private _userService: UserService,
    private _datePicker: DatePicker
  ) {
    //-----------------------------------------------------------------------------
    this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
    this.lessonsUnique=[];
    this.onlyUniqueLessons();
    //------------------------------------------------------------------------------
    if(this._loginService.getUserType()=="student"){
      this.rootPage=DashboardComponent;
    }
    else{
      let op=_userService.getOption();
      alert(op);
      if(op==0)
        this.rootPage=TeacherWordsPanelComponent;

      if(op==1)
        this.rootPage=TeacherAddStudentsComponent;
    }
    this._datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
);
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
  }
}

interface word {
  eng: string;
  pol: string;
  lesson: string;
  id: string;
}
