import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import {BackendService} from '../../services/backend.service';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import {Lesson} from '../../models/lesson';
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
  lessons: Lesson[];
  lessonsUnique: string[];
  constructor(private _navCtrl:NavController,
              private _backendService: BackendService) {
                this._backendService.getAllMyLessons().subscribe(lessons=>{
                    this.lessons = lessons

                    this.bool=[];
                    for(var i=0;i<this.lessons.length;i++){
                      this.bool[i]=false;
                    }
                })

                  this.wordsLearned=1;
                  this.wordsInLesson=50;
                  this.ratio=this.wordsLearned/this.wordsInLesson;
                  if(this.ratio<0.5)  this.status="red"
                  else if(this.ratio<0.75) this.status="yellow"
                  else this.status="green"
              }

  toggle(i:number){
    this._backendService.getMyProgress(this.lessons[i]).subscribe(progress=>{
        console.log(progress)
        this.wordsLearned = progress.guessed
        this.wordsInLesson = progress.all
        this.ratio=this.wordsLearned/this.wordsInLesson;
        if(this.ratio<0.5)  this.status="red"
        else if(this.ratio<0.75) this.status="yellow"
        else this.status="green"
        for(var j=0;j<this.bool.length;j++){
          if(i==j)
            this.bool[i]=!this.bool[i];
          else
            this.bool[j]=false;
        }


    })

  }
  logout(){
    this._navCtrl.push(GoodbyeComponent);
  }

}
