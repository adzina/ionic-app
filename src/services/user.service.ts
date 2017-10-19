import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Lesson} from '../models/lesson';
//import { NavController} from 'ionic-angular';

@Injectable()

export class UserService{
private lesson:Lesson;
private option: number;
private mode: number;

chooseLesson(lesson: Lesson) {
  this.lesson=lesson;
}
chooseOption(option: number) {
  this.option=option;
}
getOption(){
  return this.option;
}
getLesson(){
  return this.lesson;
}
getMode(){
  return this.mode;
}

setMode(mode:number){
  this.mode=mode;
}
goback(){
//  this._navCtrl.pop();
}
}
