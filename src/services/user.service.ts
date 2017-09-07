import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
//import { NavController} from 'ionic-angular';

@Injectable()

export class UserService{
private lesson:string;
private option: number;


chooseLesson(lesson: string) {
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

goback(){
//  this._navCtrl.pop();
}
}
