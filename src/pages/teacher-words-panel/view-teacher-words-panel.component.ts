import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';

@Component({
  selector: 'teacher-words-panel',
  templateUrl: 'view-teacher-words-panel.component.html',
})

export class TeacherWordsPanelComponent {
  polish: string;
  english: string;
  lessons: word[];
  lessonsFiltered: word[];
  lessonsUnique: string[];
  chosenLesson: string;
  constructor(
    private _loginService: LoginService,
    private _navCtrl: NavController,
    private _userService: UserService) {
    //-----------------------------------------------------------------------------
    this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
    this.chosenLesson = null;
    this.lessonsUnique=[];
    this.onlyUniqueLessons();
    //------------------------------------------------------------------------------
  }
  handleLessonChosen(x:string){
    this.chosenLesson=x;
    //--------------------------------------------------------------------------------
    //pobierz z bazy danych tylko slowka z danej lekcji
    this.lessonsFiltered=this.lessons.filter((l:word) => l.lesson===this.chosenLesson);
    //------------------------------------------------------------------------------------
    /*
      GET words
      findAll
      in: id lekcji
      out: [words]
    */
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
  submit() {
    //-------------------------------------------------------------------------------


    var n={pol:this.polish,eng:this.english,lesson:this.chosenLesson,id:""};

    this.lessonsFiltered.push({pol:this.polish,eng:this.english,lesson:this.chosenLesson,id:""});

    //------------------------------------------------------------------------------
    /*
      POST words
      in: id_lekcji, eng, pol
    */
    this.polish = "";
    this.english = "";
  }
  goback(){
    this._userService.goback();
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
