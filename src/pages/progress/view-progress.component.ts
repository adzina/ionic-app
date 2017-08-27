import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';

@Component({
  selector: 'my-progress',
  templateUrl: './view-progress.component.html'
})
export class ProgressComponent{

  chosenLesson: string;
  wordsInLesson: number;
  wordsLearned: number;
  status: string;
  ratio: number;
  bool: boolean[];
  lessons: word[];
  lessonsUnique: string[];
  constructor(private _loginService: LoginService,
              private _navCtrl:NavController,
              private _userService: UserService) {
                  //-----------------------------------------------------------------------------
                  this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
                  this.lessonsUnique=[];
                  this.bool=[];
                  this.onlyUniqueLessons();
                  //------------------------------------------------------------------------------
                  this.wordsLearned=1;
                  this.wordsInLesson=50;
                  this.ratio=this.wordsLearned/this.wordsInLesson;
                  if(this.ratio<0.5)  this.status="red"
                  else if(this.ratio<0.75) this.status="yellow"
                  else this.status="green"
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
          for(var i=0;i<this.lessonsUnique.length;i++){
            this.bool[i]=false;
          }
  }
  toggle(i:number){
    for(var j=0;j<this.bool.length;j++){
      if(i==j)
        this.bool[i]=!this.bool[i];
      else
        this.bool[j]=false;
    }
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
