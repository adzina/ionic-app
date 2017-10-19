import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {UserService} from '../../services/user.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import {Lesson} from '../../models/lesson';

@Component({
  selector: 'dashboard',
  templateUrl: 'view-dashboard.component.html'
})

export class DashboardComponent{
  lessons: word[];
  lessonsFiltered: word[];
  word: word;
  response: string;
  ok: boolean;
  user: string;
  clicked: boolean;
  chosenLesson: Lesson;
  mode: number;
  constructor(
    private _backendService: BackendService,
    private _userService: UserService,
    public _navCtrl: NavController){
    this.response=null;
    this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" },
                    { eng: "two", pol: "dwa", id: "2", lesson: "words1" },
                    { eng: "three", pol: "trzy", id: "3", lesson: "words1" },
                    { eng: "four", pol: "cztery", id: "4", lesson: "words1" },
                    { eng: "dog", pol: "pies", id: "5", lesson: "words2" },
                    { eng: "cat", pol: "kot", id: "6", lesson: "words2" }];
    this.ok=null;
    this.clicked=false;
    this.lessonsFiltered=[];
    this.mode=this._userService.getMode();
    this.chosenLesson=this._userService.getLesson();
    //this.lessonsFiltered=this.lessons.filter((l:word) => l.lesson===this.chosenLesson);
    this.word=this.lessonsFiltered[Math.floor(Math.random()*this.lessonsFiltered.length)];
  }

  assign(x:string){
    if(!this.clicked){
      this.clicked=true;
      for(var i=0;i<this.lessons.length;i++){
        if(x==this.lessons[i].pol){
          this.response=this.lessons[i].pol;
        }
      }
     this.ok=this.response==this.word.pol ? true : false;
     /*
     student2words
     findOne
     in: wordID,studentID
     out: attempts, guessed
     if(this.ok && attempts==0){
     UPDATE guessed=3;
   }
   if(this.ok && attempts!=0){
   UPDATE attempts++;
   UPDATE guessed++;
 }
 else{
  UPDATE attempts++;
}
     */
   }
  }
  swipeEvent(e) {
    if(e.direction == '2'){
      this.nextword();
    }
}
  nextword(){
    if(this.clicked){
      this.clicked=false;
      this.word=this.lessonsFiltered[Math.floor(Math.random()*this.lessonsFiltered.length)];
      this.response=null;
      this.ok=null;}
  }
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }
}
interface word {
  pol:string;
  eng:string;
  id:string;
  lesson:string;
}
