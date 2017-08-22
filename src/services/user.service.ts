import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
//import { NavController} from 'ionic-angular';

@Injectable()

export class UserService{
//  constructor(private _navCtrl:NavController){  }
  // Observable string sources
private lessonChosenSource = new Subject<string>();
private option: number;

// Observable string streams
lessonChosen$ = this.lessonChosenSource.asObservable();

// Service message commands
chooseLesson(lesson: string) {
  this.lessonChosenSource.next(lesson);
}
chooseOption(option: number) {
  this.option=option;
}
getOption(){
  return this.option;
}
goback(){
//  this._navCtrl.pop();
}
}
