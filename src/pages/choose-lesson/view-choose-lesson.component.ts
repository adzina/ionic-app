import {Component} from '@angular/core';
import {DatePicker} from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {BackendService} from '../../services/backend.service';
import {DashboardComponent} from '../dashboard/view-dashboard.component';
import {GoodbyeComponent} from '../goodbye/view-goodbye.component';
import { Group } from '../../models/group';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'choose-lesson',
  templateUrl: 'view-choose-lesson.component.html',
})

export class ChooseLessonComponent{

  mode: number;
  from_date: Date;
  until_date: Date;
  lessons: Lesson[];
  lessonsUnique: string[];
  constructor(private _navCtrl: NavController,
              private _datePicker: DatePicker,
              private _userService: UserService,
              private _backendService: BackendService,
              private _toast: ToastController){
                //-----------------------------------------------------------------------------
                // this.lessons = [{ eng: "one", pol: "jeden", id: "1", lesson: "words1" }, { eng: "two", pol: "dwa", id: "2", lesson: "words1" }, { eng: "three", pol: "trzy", id: "3", lesson: "words1" }, { eng: "cat", pol: "kot", id: "4", lesson: "words2" }, { eng: "dog", pol: "pies", id: "5", lesson: "words2" }];
                // this.lessonsUnique=[];
                // this.onlyUniqueLessons();
                //------------------------------------------------------------------------------
                this._backendService.getAllMyGroups().subscribe(data=>{
                  this.lessons=data;
                });

    this.mode=null;
  }
  choose(i: number) {
    var lessonChosen=this.lessons[i];
    this._userService.chooseLesson(lessonChosen);
    this.pushDash();
  }
  pushDash(){
    this._navCtrl.push(DashboardComponent);
  }
  setmode(m:number){
    this.mode=m;
  }
  from(){
    this._datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => this.from_date=date
            );
  }
  until(){  this._datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this._datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => {this.until_date=date;
                    if(this.until_date>this.from_date)
                      {
                        this._userService.chooseLesson(this.lessons[0]);
                        this._navCtrl.push(DashboardComponent);}
                    else
                      this.presentToast();
                    }
            );
          }

  presentToast() {
      let toast = this._toast.create({
                message: 'Wrong dates',
                duration: 5000,
                position: 'middle'
              });
          toast.present();
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
